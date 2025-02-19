import * as readline from "readline";
import * as admin from "firebase-admin";
import * as path from "path";
import * as fs from "fs";

// Function to prompt the user for input
async function promptUser(prompt: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  try {
    const environment = await promptUser(
      "Enter the environment (development or live): ",
    );

    if (environment !== "development" && environment !== "live") {
      console.log(
        'Invalid environment. Please enter either "development" or "live".',
      );
      return;
    }

    const collectionName = await promptUser("Enter the collection name: ");

    if (!collectionName) {
      console.log("No collection name was provided. Please try again.");
      return;
    }

    console.log(`You entered collection name: ${collectionName}`);
    console.log(`You selected environment: ${environment}`);

    // Initialize Firebase Admin SDK based on the environment
    const serviceAccountPath = path.resolve(
      __dirname,
      environment === "development"
        ? "./serviceAccounts/dev.json"
        : "./serviceAccounts/live.json",
    );

    admin.initializeApp({
      credential: admin.credential.cert(require(serviceAccountPath)),
      // change based on environment later
      databaseURL:
        "https://bilingual-generation-live-default-rtdb.firebaseio.com",
    });

    console.log("Firebase Admin initialized successfully.");

    const db = admin.database();

    // Fetch the first document from the specified collection
    const snapshot = await db.ref(collectionName).get();

    if (!snapshot.exists()) {
      console.log(`No records found in the collection: ${collectionName}`);
      return;
    }

    let collections: any[] = [];

    //snapshot.forEach((doc) => {
    //  collections.push({ ...doc.data(), id: doc.id });
    //});

    // Write the first record to a JSON file
    const filePath = path.resolve(__dirname, `../output/rtdb.json`);
    //fs.writeFileSync(filePath, JSON.stringify(collections, null, 2));
    fs.writeFileSync(filePath, JSON.stringify(snapshot.val(), null, 2));

    console.log(`First record written to file: ${filePath}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
