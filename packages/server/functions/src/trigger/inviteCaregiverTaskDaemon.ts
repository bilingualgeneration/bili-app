const functions = require("firebase-functions");

const aws = require("@aws-sdk/client-ses");
const cheerio = require("cheerio");
const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");
const PDFDocument = require("pdfkit");
const SVGtoPDF = require("svg-to-pdfkit");

const html = `<p>
<strong>✨¡Bienvenido a <a href='https://thebiliapp.com' target='_blank'>Bili</a>!</strong> Su puerta a un mundo bilingüe, personalizado para su hij@. 
</p>

<p>
Siga los pasos que se detallan en el folleto (PDF) adjunto para <a href='https://thebiliapp.com' target='_blank'>activar su cuenta de Cuidador</a> y descubrir todo lo que Bili tiene para ofrecerle a usted y a su familia.
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
Follow the steps outlined in the attached PDF to <a href='https://thebiliapp.com' target='_blank'>activate your Caregiver account</a> and discover all that Bili has to offer you and your family.
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

const plaintext = `✨¡Bienvenid@ a Bili! Su puerta a un mundo bilingüe, personalizado para su hij@.

Siga los pasos que se detallan en el folleto (PDF) adjunto para activar su cuenta de Cuidador y descubrir todo lo que Bili tiene para ofrecerle a usted y a su familia.

Si tiene alguna pregunta, conéctese con la maestra de su hij@, o envíe un correo electrónico al equipo de Bili a support@thebiliapp.com. 

¡Agradecemos su apoyo y estamos emocionad@s de ver cómo su hij@ disfruta usando Bili!

– – – 

✨Welcome to Bili! Your gateway to a bilingual world, personalized for your child. 

Follow the steps outlined in the attached PDF to activate your Caregiver account and discover all that Bili has to offer you and your family:

If you have any questions, our support team is here to help at support@thebiliapp.com. 

We appreciate your support and can’t wait to see how your child enjoys using Bili!

Saludos,
The Bili Team / El equipo de Bili`;

const generatePage1 = (studentName: string, classCode: string) => {
  const pagePath = path.join(
    __dirname,
    "../assets",
    "caregiver_invite_page_1.svg",
  );
  //const pagePath = path.join(__dirname,'assets', 'page1.svg');
  const page = fs.readFileSync(pagePath, "utf8");

  const $ = cheerio.load(page, { xmlMode: true });
  $("#studentName").text(studentName);
  $("#classCode").text(classCode);
  return $.xml();
};

const generatePage2 = (email: string) => {
  const pagePath = path.join(
    __dirname,
    "../assets",
    "caregiver_invite_page_2.svg",
  );
  const page = fs.readFileSync(pagePath, "utf8");

  const $ = cheerio.load(page, { xmlMode: true });
  $("#email").text(email);
  return $.xml();
};

const generatePDF = async (
  studentName: string,
  classCode: string,
  email: string,
) => {
  return new Promise((resolve, reject) => {
    const svg1 = generatePage1(studentName, classCode);
    const svg2 = generatePage2(email);
    let buffers: any[] = [];

    const doc = new PDFDocument();
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    SVGtoPDF(doc, svg1, 0, 0);
    doc.addPage();
    SVGtoPDF(doc, svg2, 0, 0);
    doc.end();
  });
};

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

const sendMail = async (name: string, code: string, email: string) => {
  const buffer = await generatePDF(name, code, email);

  const mailOptions = {
    from: "support@thebiliapp.com",
    to: email,
    subject: "¡Bienvenid@ a Bili! Welcome to Bili!",
    text: plaintext,
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

export const inviteCaregiverTaskDaemon = functions
  .runWith({
    memory: "512MB",
    timeoutSeconds: 300,
  })
  .https.onRequest(async (req: any, res: any) => {
    try {
      const { studentName, classCode, email } = req.body;
      const a = await sendMail(studentName, classCode, email);
      res.status(200).send(JSON.stringify(a));
    } catch (error: any) {
      res.status(500).send(JSON.stringify(error));
    }
  });
