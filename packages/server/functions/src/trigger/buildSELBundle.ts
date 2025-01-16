const admin = require("firebase-admin");
const functions = require("firebase-functions");

const SEL_QUESTION_COLLECTION = "sel-question";
const BUNDLES_COLLECTION = "bundles";
const BUNDLES_DOC_ID = "sel-questions"; // The document in the bundles collection to update

// Firestore trigger for sel-question collection
export const buildSELBundle = functions.firestore
  .document(`${SEL_QUESTION_COLLECTION}/{docId}`)
  .onWrite(async (change: any, context: any) => {
    const docId = context.params.docId;
    const bundlesRef = admin
      .firestore()
      .collection(BUNDLES_COLLECTION)
      .doc(BUNDLES_DOC_ID);

    try {
      // Get the current state of the bundles document
      const bundlesDoc = await bundlesRef.get();
      const bundlesData = bundlesDoc.exists ? bundlesDoc.data() : { data: {} };

      if (!bundlesData.data) {
        bundlesData.data = {};
      }

      const currentDataMap = bundlesData.data;

      if (!change.before.exists) {
        // Document was created
        const newData = change.after.data();
        currentDataMap[docId] = newData;

        console.log(`Added data for ${docId}:`, newData);
      } else if (!change.after.exists) {
        // Document was deleted
        delete currentDataMap[docId];

        console.log(`Removed data for ${docId}`);
      } else {
        // Document was updated
        const updatedData = change.after.data();
        currentDataMap[docId] = updatedData;

        console.log(`Updated data for ${docId}:`, updatedData);
      }

      // Update the bundles document
      await bundlesRef.set({ data: currentDataMap }, { merge: true });

      console.log("Bundles document updated successfully.");
    } catch (error) {
      console.error("Error updating bundles document:", error);
    }

    return null;
  });
