const admin = require("firebase-admin");
import { upsertStudent } from "../student/upsert";
import { onCall } from "firebase-functions/v2/https";

export const signup = onCall(async (request) => {
  const profileBlankDefaults: any = {
    country: null,
    dailyPlaytimeLimit: "unlimited",
    dob: null,
    isInclusive: false,
    isImmersive: false,
    phone: null,
  };

  let profile: any = Object.assign(profileBlankDefaults, {
    role: "caregiver",
    name: request.data.name,
    language: request.data.language,
  });

  const userRecord = await admin.auth().createUser({
    email: request.data.email,
    password: request.data.password,
    disabled: false,
    emailVerified: false,
  });
  const uid: string = userRecord.uid;

  await Promise.all([
    upsertStudent({
      firstName: request.data.childName,
      // lastName: request.data.???
      caregiverEmail: [request.data.email],
      caregiver: [uid],
      age: request.data.childAge,
      // request.data.isImmersive
    }),
    admin.firestore().collection("user").doc(uid).set(profile),
  ]);
});
