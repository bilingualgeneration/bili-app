import * as fs from "fs";
import * as yaml from "yaml";
import * as path from "path";
import axios from "axios";

const filePath = path.join(__dirname, "data", "caregiver_flyer_enqueue.yaml");
const apiEndpoint =
  "https://us-central1-bilingual-generation-live.cloudfunctions.net/enqueueTask";

async function processAndPostData() {
  try {
    // Read the YAML file
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Parse the YAML contents into a JavaScript object
    const students = yaml.parse(fileContents);

    // Validate and process the parsed data
    if (Array.isArray(students)) {
      for (const [index, student] of students.entries()) {
        const { studentName, classCode, email } = student;

        // Validate object structure
        if (studentName && classCode && email) {
          try {
            const response = await axios.post(apiEndpoint, {
              studentName,
              classCode,
              email,
            });
            console.log(
              `Student #${
                index + 1
              }: Successfully enqueued task for ${studentName}`,
            );
          } catch (error) {
            if (axios.isAxiosError(error)) {
              // Axios-specific error handling
              console.error(
                `Student #${
                  index + 1
                }: Failed to enqueue task for ${studentName}.`,
                `Response: ${error.response?.data || "No response data"}`,
              );
            } else if (error instanceof Error) {
              // Generic error handling
              console.error(
                `Student #${
                  index + 1
                }: Failed to enqueue task for ${studentName}.`,
                `Message: ${error.message}`,
              );
            } else {
              console.error(
                `Student #${index + 1}: An unknown error occurred.`,
              );
            }
          }
        } else {
          console.warn(`Student #${index + 1}: Invalid entry`, student);
        }
      }
    } else {
      console.error("Parsed data is not an array:", students);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error reading, parsing, or processing the YAML file:",
        error.message,
      );
    } else {
      console.error(
        "An unknown error occurred while processing the YAML file.",
      );
    }
  }
}

// Run the function
processAndPostData();
