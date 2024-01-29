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

  // todo: need better solution for pricing tracking
  const userProfile: any = {
    country: null,
    dailyPlaytimeLimit: "unlimited",
    dob: null,
    email: data.email,
    isImmersive: data.isImmersive,
    isInclusive: data.isInclusive,
    isSoundEffects: true,
    settingsLanguage: data.settingsLanguage,
    name: data.name,
    phone: null,
    pricing: data.pricing,
    role: data.role,
  };

  const childProfile: any = {
    name: data.childName || "Student A", // default name for teacher
    age: data.childAge || "?", // default age for teacher,
    role: "child",
    completionPoints: 0,
    parentId: uid,
  };
  await Promise.all([
    admin.firestore().collection("users").doc(uid).set(userProfile),
    admin.firestore().collection("users").add(childProfile),
  ]);
});
