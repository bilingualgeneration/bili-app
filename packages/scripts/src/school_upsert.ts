import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";
import { schoolUpsertInputSchema } from "./schema/schoolUpsertInput";
import { fromError } from "zod-validation-error";
const serviceAccountDev = require("./serviceAccounts/dev.json");
const serviceAccountLive = require("./serviceAccounts/live.json");

async function upsertSchools() {
  try {
    // Load YAML file
    const filePath = path.resolve(__dirname, "./data/school_upsert.yaml");
    const file = fs.readFileSync(filePath, "utf8");
    const data = yaml.parse(file);
    const parseResult = schoolUpsertInputSchema.safeParse(data);
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
    for (const school of data.payload) {
      if (school.id) {
        // If ID is present, update the document with that ID
        await db
          .collection("school")
          .doc(school.id)
          .set(school, { merge: true });
        console.log(`Updated school with ID: ${school.id}`);
      } else {
        // If ID is not present, create a new document with auto-generated ID
        const newDocRef = await db.collection("school").add(school);
        console.log(`Inserted new school with ID: ${newDocRef.id}`);
      }
    }
  } catch (error) {
    console.error("Error upserting schools:", error);
  }
}

upsertSchools();
