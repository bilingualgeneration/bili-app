const admin = require("firebase-admin");
const { FieldValue } = require("firebase-admin/firestore");
import { upsertStudent } from "../student/upsert";
import { findStudentsByCaregiverEmail } from "../caregiver/findStudents";
import { onCall } from "firebase-functions/v2/https";

export const signup = onCall(async (request) => {
  const profileBlankDefaults: any = {
    country: null,
    dob: null,
    isInclusive: false,
    phone: null,
    plan: null,
    planExpiration: null,
    role: "caregiver",
  };

  let profile: any = Object.assign(profileBlankDefaults, {
    language: request.data.language,
    name: request.data.name,
    studentLanguage: request.data.studentLanguage,
  });

  const userRecord = await admin.auth().createUser({
    email: request.data.email,
    password: request.data.password,
    disabled: false,
    emailVerified: false,
  });
  const uid: string = userRecord.uid;

  const tasks = [admin.firestore().collection("user").doc(uid).set(profile)];

  if (request.data.childName && request.data.childAge) {
    // user is signing up independent of a class
    tasks.push(
      upsertStudent({
        firstName: request.data.childName,
        // lastName: request.data.???
        caregiverEmail: [request.data.email],
        caregiver: [uid],
        age: request.data.childAge,
        // request.data.isImmersive
      }),
    );
  }

  const students = await findStudentsByCaregiverEmail(request.data.email);
  for (const studentId of students) {
    admin
      .firestore()
      .collection("student")
      .doc(studentId)
      .set(
        {
          caregiver: FieldValue.arrayUnion(uid),
        },
        { merge: true },
      );
  }

  //await Promise.all(tasks);
});
