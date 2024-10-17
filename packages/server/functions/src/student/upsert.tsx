const admin = require("firebase-admin");

interface upsertStudentProps {
  id?: string;
  age?: number;
  firstName?: string;
  lastName?: string;
  classroom?: string[];
  caregiver?: string[];
  caregiverEmail?: string[];
}

export const upsertStudent = async ({
  id: idProps,
  age,
  firstName,
  lastName,
  classroom,
  caregiver,
  caregiverEmail,
}: upsertStudentProps) => {
  const id = idProps ?? admin.firestore().collection("scrap").doc().id;
  let payload: any = {};
  if (age) payload.age = age;
  if (firstName) payload.firstName = firstName;
  if (lastName) payload.lastName = lastName;
  if (classroom) payload.classroom = classroom;
  if (caregiver) payload.caregiver = caregiver;
  if (caregiverEmail) payload.caregiverEmail = caregiverEmail;

  await admin
    .firestore()
    .collection("student")
    .doc(id)
    .set(payload, { merge: true });
  return id;
};
