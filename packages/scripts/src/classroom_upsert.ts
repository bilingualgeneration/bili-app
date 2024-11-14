import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";
import { classroomUpsertInputSchema } from "./schema/classroomUpsertInput";
import { fromError } from "zod-validation-error";
const serviceAccountDev = require("./serviceAccounts/dev.json");
const serviceAccountLive = require("./serviceAccounts/live.json");

async function upsertClassrooms() {
  try {
    // Load YAML file
    const filePath = path.resolve(__dirname, "./data/classroom_upsert.yaml");
    const file = fs.readFileSync(filePath, "utf8");
    const data = yaml.parse(file);
    const parseResult = classroomUpsertInputSchema.safeParse(data);
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
    for (const classroom of data.payload) {
      if (classroom.id) {
        // If ID is present, update the document with that ID
        await db
          .collection("classroom")
          .doc(classroom.id)
          .set(classroom, { merge: true });
        console.log(`Updated classroom with ID: ${classroom.id}`);
      } else {
        // If ID is not present, create a new document with auto-generated ID
        const newDocRef = await db.collection("classroom").add(classroom);
        console.log(`Inserted new classroom with ID: ${newDocRef.id}`);
      }
    }
  } catch (error) {
    console.error("Error upserting classrooms:", error);
  }
}

upsertClassrooms();
