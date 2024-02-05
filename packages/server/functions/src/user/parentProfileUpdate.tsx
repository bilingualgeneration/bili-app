const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";

export const parentProfileUpdate = onCall(async (request) => {
  // todo: validation
  const uid: string = request.auth!.uid;
  await admin.firestore().collection("users").doc(uid).update(request.data);
});
