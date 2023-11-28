const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const signup = onCall(async (request) => {
  // todo: validate input
  // todo: check if errors in sign up, such as if email address already in use
  const data = request.data;
  logger.log(data);
  const userRecord = await admin.auth().createUser({
    email: data.email,
    password: data.password,
    disabled: false,
    emailVerified: false,
  });
  const uid: string = userRecord.uid;
  await admin.firestore().collection("users").doc(uid).set({
    grades: data.grades,
    isInclusive: data.isInclusive,
    isImmersive: data.isImmersive,
    name: data.name,
    pricing: data.pricing,
    role: data.role,
    school: data.school,
    schoolRoles: data.schoolRoles,
  });
});
