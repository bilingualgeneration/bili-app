import * as fs from "fs";
import * as path from "path";
//import * as csv from 'csv-parser';
const csv = require("csv-parser");
import yaml from "yaml";

const csvFilePath = path.join(__dirname, "data", "classroom_code_list.csv");
const yamlFilePath = path.join(
  __dirname,
  "../output",
  "caregiver_flyer_enqueue.yaml",
);

interface ClassroomRow {
  "Classroom Name": string;
  "Classroom Code": string;
  "Student First Name": string;
  "Student Last Name": string;
  "Caregiver Email": string;
  "Send Email": string;
}

const entries: {
  studentName: string;
  classCode: string;
  email: string;
}[] = [];

try {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row: ClassroomRow) => {
      if (row["Send Email"].toUpperCase() === "TRUE") {
        const emails = row["Caregiver Email"]
          .split(",")
          .map((email) => email.trim());
        emails.forEach((email) => {
          entries.push({
            studentName: row["Student First Name"],
            classCode: row["Classroom Code"],
            email: email,
          });
        });
      }
    })
    .on("end", () => {
      const yamlData = yaml.stringify(entries);
      const outputDir = path.dirname(yamlFilePath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      fs.writeFileSync(yamlFilePath, yamlData, "utf8");
      console.log(`YAML file successfully written to ${yamlFilePath}`);
    })
    .on("error", (error: Error) => {
      // Explicitly type the 'error' parameter
      throw new Error(`Error reading CSV file: ${error.message}`);
    });
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("An unknown error occurred:", error);
  }
}
