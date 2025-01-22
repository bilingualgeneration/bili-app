// TODO: check input

const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const findByCode = onCall(async (request) => {
  const results = await admin
    .firestore()
    .collection("classroom")
    .where("code", "==", request.data.code.toLowerCase())
    .get();
  if (results.size === 0) {
    return null;
  } else {
    return results.docs.map((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }
});
