// TODO: check input

const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";
//import { QueryDocumentSnapshot } from "firebase/firestore";

export const findByClassroomCode = onCall(async (request) => {
  const results = await admin
    .firestore()
    .collection("classroom")
    .where("classroomCode", "==", request.data.classroomCode.toLowerCase())
    .get();
  if (results.size === 0) {
    return null;
  } else {
    // assume classroom codes are unique
    const doc = results.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    };
  }
});
