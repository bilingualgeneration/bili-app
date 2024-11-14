import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";
import { classroomAnalyticsUpsertInputSchema } from "./schema/classroomAnalyticsUpsertInput";
import { fromError } from "zod-validation-error";
const serviceAccountDev = require("./serviceAccounts/dev.json");
const serviceAccountLive = require("./serviceAccounts/live.json");

async function upsertClassroomAnalytics() {
  try {
    // Load YAML file
    const filePath = path.resolve(
      __dirname,
      "./data/classroom_analytics_upsert.yaml",
    );
    const file = fs.readFileSync(filePath, "utf8");
    const data = yaml.parse(file);
    const parseResult = classroomAnalyticsUpsertInputSchema.safeParse(data);
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
    for (const classroomAnalytics of data.payload) {
      if (classroomAnalytics.id) {
        // If ID is present, update the document with that ID
        await db
          .collection("classroomAnalytics")
          .doc(classroomAnalytics.id)
          .set(classroomAnalytics, { merge: true });
        console.log(
          `Updated classroomAnalytics with ID: ${classroomAnalytics.id}`,
        );
      } else {
        // If ID is not present, create a new document with auto-generated ID
        const newDocRef = await db
          .collection("classroomAnalytics")
          .add(classroomAnalytics);
        console.log(`Inserted new classroomAnalytics with ID: ${newDocRef.id}`);
      }
    }
  } catch (error) {
    console.error("Error upserting classroomAnalytics:", error);
  }
}

upsertClassroomAnalytics();
