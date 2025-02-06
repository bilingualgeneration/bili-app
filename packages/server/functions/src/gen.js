const puppeteer = require("puppeteer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

// Define the assets directory relative to the script location
const ASSETS_DIR = path.join(__dirname, "assets");

// Read and parse the YAML file
function loadYamlFile() {
  const yamlPath = path.join(__dirname, "list.yaml");
  const fileContents = fs.readFileSync(yamlPath, "utf8");
  return yaml.parse(fileContents) || [];
}

async function generatePdf(pageName, replacements = {}) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = path.join(
    ASSETS_DIR,
    pageName,
    "publication-web-resources",
    "html",
    "publication.html",
  );
  let htmlContent = fs.readFileSync(filePath, "utf8");

  // Apply replacements only for page1
  if (pageName === "page1") {
    htmlContent = htmlContent
      .replace(/NAMENAMENAME/g, replacements.name || "")
      .replace(/CODECODECODE/g, replacements.code || "")
      .replace(/EMAILEMAILEMAIL/g, replacements.email || "");
    fs.writeFileSync(filePath, htmlContent); // Save modified content temporarily
  }

  const fileUrl = `file://${filePath}`;
  await page.goto(fileUrl, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  return pdfBuffer;
}

// Function to merge two PDFs
async function mergePdfs(pdfBuffers) {
  const mergedPdf = await PDFDocument.create();

  for (const buffer of pdfBuffers) {
    const pdf = await PDFDocument.load(buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

// Main function to process all students
async function processStudents() {
  try {
    const students = loadYamlFile();
    if (students.length === 0) {
      console.log("No students found in list.yaml");
      return;
    }

    for (const student of students) {
      const { studentName, classCode, email } = student;
      if (!studentName || !classCode || !email) {
        console.error("Skipping entry due to missing fields:", student);
        continue;
      }

      const replacements = { name: studentName, code: classCode, email };

      // Generate PDFs for both pages
      const pdf1 = await generatePdf("page1", replacements);
      const pdf2 = await generatePdf("page2");

      // Merge PDFs
      const mergedPdf = await mergePdfs([pdf1, pdf2]);

      // Ensure email is a valid filename (remove special characters)
      const safeEmail = email.replace(/[^a-zA-Z0-9.@_-]/g, "_");
      const outputFilePath = path.join(
        ASSETS_DIR,
        `${classCode}.${studentName}.${safeEmail}.pdf`,
      );

      // Save PDF with email as filename
      fs.writeFileSync(outputFilePath, mergedPdf);

      console.log(`PDF saved: ${outputFilePath}`);
    }
  } catch (error) {
    console.error("Error processing students:", error);
  }
}

// Run the function
processStudents();
