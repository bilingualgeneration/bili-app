const { debug } = require("firebase-functions/logger");
const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");

// HTML content for the email
const html = `<p>
<strong>✨¡Bienvenido a <a href='https://thebiliapp.com' target='_blank'>Bili</a>!</strong> Su puerta a un mundo bilingüe, personalizado para su hij@. 
</p>

<p>
Siga los pasos que se detallan en el folleto (PDF) adjunto para <a href='https://app.thebiliapp.com' target='_blank'>activar su cuenta de Cuidador</a> y descubrir todo lo que Bili tiene para ofrecerle a usted y a su familia.
</p>

<p>
Si tiene alguna pregunta, conéctese con la maestra de su hij@, o envíe un correo electrónico al equipo de Bili a <a href='mailto:support@thebiliapp.com'>support@thebiliapp.com</a>. 
</p>

<p>
¡Agradecemos su apoyo y estamos emocionad@s de ver cómo su hij@ disfruta usando Bili!
</p>

<p>
– – – 
</p>

<p>
<strong>✨Welcome to <a href='https://thebiliapp.com' target='_blank'>Bili</a>!</strong> Your gateway to a bilingual world, personalized for your child. 
</p>

<p>
Follow the steps outlined in the attached PDF to <a href='https://app.thebiliapp.com' target='_blank'>activate your Caregiver account</a> and discover all that Bili has to offer you and your family.
</p>

<p>
If you have any questions, our support team is here to help at <a href='mailto:support@thebiliapp.com'>support@thebiliapp.com</a>. 
</p>

<p>
We appreciate your support and can’t wait to see how your child enjoys using Bili!
</p>

<p>
Saludos,<br />
The Bili Team / El equipo de Bili
</p>`;

interface RequestBody {
  name: string;
  code: string;
  email: string;
}

export const inviteCaregiverTaskDaemon = functions
  .runWith({
    memory: "512MB", // Memory limit for the function
    timeoutSeconds: 300, // Timeout limit for the function
  })
  .https.onRequest(async (req: any, res: any) => {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    // Extract name, code, email from the request body
    const { name, code, email }: RequestBody = req.body;

    if (!name || !code || !email) {
      debug(name);
      debug(code);
      debug(email);
      debug(JSON.stringify(req.body));
      return res.status(400).send("Missing name, code, or email");
    }

    try {
      // Generate the PDFs (page1 with replacements, page2 without)
      const pdfBufferPage1 = await convertHtmlToPdf("page1", name, code, email);
      const pdfBufferPage2 = await convertHtmlToPdf("page2"); // No replacements for page2

      // Load the PDFs into pdf-lib
      const pdfDoc = await PDFDocument.create();

      // Load the first page's PDF into the document
      const pdf1 = await PDFDocument.load(pdfBufferPage1);
      const pages1 = await pdfDoc.copyPages(
        pdf1,
        pdf1.getPages().map((_: any, i: any) => i),
      );
      pages1.forEach((page: any) => pdfDoc.addPage(page));

      // Load the second page's PDF into the document (no replacements)
      const pdf2 = await PDFDocument.load(pdfBufferPage2);
      const pages2 = await pdfDoc.copyPages(
        pdf2,
        pdf2.getPages().map((_: any, i: any) => i),
      );
      pages2.forEach((page: any) => pdfDoc.addPage(page));

      // Save the combined PDF
      const combinedPdf = await pdfDoc.save();

      // Now send the PDF as an email attachment
      await sendMail(email, Buffer.from(combinedPdf));

      // Return a success message
      res.status(200).send("PDF generated and emailed successfully!");
      console.log("PDF sent successfully to:", email);
    } catch (error: any) {
      console.error("Error generating or sending PDF:", error);
      res.status(500).send("Internal Server Error");
    }
  });

// Helper function to convert HTML to PDF
async function convertHtmlToPdf(
  pageName: string,
  name?: string,
  code?: string,
  email?: string,
): Promise<Buffer> {
  // Resolve the absolute path to the HTML file based on the page name
  const filePath = path.resolve(
    __dirname,
    "..",
    "assets",
    pageName,
    "publication-web-resources",
    "html",
    "publication.html",
  );

  // Launch Puppeteer browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Open the HTML file
  await page.goto(`file://${filePath}`, { waitUntil: "networkidle0" });

  // Get the HTML content from the page
  let htmlContent = await page.content();

  // Perform replacements only for page1
  if (pageName === "page1" && name && code && email) {
    htmlContent = htmlContent
      .replace(/NAMENAMENAME/g, name)
      .replace(/CODECODECODE/g, code)
      .replace(/EMAILEMAILEMAIL/g, email);

    console.log(
      `Replacements applied for ${pageName}: Name: ${name}, Code: ${code}, Email: ${email}`,
    );
  }

  // Set the modified HTML content in the page
  await page.setContent(htmlContent);

  // Generate PDF from the modified page (returns a Uint8Array)
  const pdfUint8Array = await page.pdf({
    format: "A4", // PDF size
    printBackground: true, // Include background graphics in the PDF
  });

  // Convert Uint8Array to Buffer
  const pdfBuffer = Buffer.from(pdfUint8Array);

  console.log(`${pageName} PDF generated successfully!`);

  // Close the browser
  await browser.close();

  return pdfBuffer;
}

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const sendMail = async (email: string, buffer: any) => {
  const mailOptions = {
    from: "support@thebiliapp.com",
    to: email,
    subject: "¡Bienvenid@ a Bili! Welcome to Bili!",
    //    text: plaintext,
    html: html,
    attachments: [
      {
        filename: "Bili_Instrucciones_para_registración.pdf", // The name of the attachment
        content: buffer, // Use the in-memory PDF stream
        encoding: "base64", // Encoding is not strictly necessary with a stream, but kept for safety
      },
    ],
  };

  // Send the email with the PDF attachment
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};
