import * as fs from "fs";
import * as path from "path";
import { createObjectCsvWriter } from "csv-writer";

// Resolve the file paths
const classroomPath = path.join(__dirname, "../output/classroom.json");
const studentPath = path.join(__dirname, "../output/student.json");

// Function to load JSON data from a file
function loadJsonData(filePath: string): any {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error loading JSON data from file: ${filePath}`, error);
    return null;
  }
}

// Load classroom and student data
const classroomData = loadJsonData(classroomPath);
const studentData = loadJsonData(studentPath);

// Prepare the CSV writer to write to the '../output' directory
const csvWriter = createObjectCsvWriter({
  path: path.join(__dirname, "../output/matching_students.csv"),
  header: [
    { id: "classroomName", title: "Classroom Name" },
    { id: "classroomCode", title: "Classroom Code" },
    { id: "studentFirstName", title: "Student First Name" },
    { id: "studentLastName", title: "Student Last Name" },
    { id: "caregiverEmail", title: "Caregiver Email" },
  ],
});

// Function to find students for each classroom
function findStudentsForClassrooms(classroomData: any[], studentData: any[]) {
  if (!classroomData || !studentData) return;

  let records: any[] = [];

  classroomData.forEach((classroom) => {
    const classroomId = classroom.id; // Use 'id' to match with students
    const matchingStudents = studentData.filter(
      (student) => student.classroom && student.classroom.includes(classroomId), // Check if 'classroom' exists and contains the id
    );

    matchingStudents.forEach((student) => {
      const caregiverEmails = student.caregiverEmail
        ? student.caregiverEmail.join(", ")
        : ""; // Join emails if it's an array
      records.push({
        classroomName: classroom.name,
        classroomCode: classroom.code,
        studentFirstName: student.firstName,
        studentLastName: student.lastName,
        caregiverEmail: caregiverEmails,
      });
    });
  });

  // Write the records to a CSV file in the '../output' directory
  csvWriter
    .writeRecords(records)
    .then(() =>
      console.log(
        "CSV file written successfully to ../output/matching_students.csv",
      ),
    )
    .catch((error: Error) => console.error("Error writing CSV file:", error));
}

// Find students for each classroom and output to CSV
findStudentsForClassrooms(classroomData, studentData);
