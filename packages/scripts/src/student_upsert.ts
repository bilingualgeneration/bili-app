import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";
import { studentUpsertInputSchema } from "./schema/studentUpsertInput";
import { fromError } from "zod-validation-error";
const serviceAccountDev = require("./serviceAccounts/dev.json");
const serviceAccountLive = require("./serviceAccounts/live.json");

async function upsertStudents() {
  try {
    // Load YAML file
    const filePath = path.resolve(__dirname, "./data/student_upsert.yaml");
    const file = fs.readFileSync(filePath, "utf8");
    const data = yaml.parse(file);
    const parseResult = studentUpsertInputSchema.safeParse(data);
    if (!parseResult.success) {
      console.log(fromError(parseResult.error).toString().split("; "));
      return;
    }

    // Get environment from the YAML or fallback to the process environment
    const yamlEnvironment = data.environment;
    const serviceAccount =
      yamlEnvironment === "live" ? serviceAccountLive : serviceAccountDev;

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();

    // Iterate over each school in the payload
    for (const student of data.payload) {
      if (student.id) {
        // If ID is present, update the document with that ID
        await db
          .collection("student")
          .doc(student.id)
          .set(student, { merge: true });
        console.log(`Updated student with ID: ${student.id}`);
      } else {
        // If ID is not present, create a new document with auto-generated ID
        const newDocRef = await db.collection("student").add(student);
        console.log(`Inserted new student with ID: ${newDocRef.id}`);
      }
    }
  } catch (error) {
    console.error("Error upserting students:", error);
  }
}

upsertStudents();
