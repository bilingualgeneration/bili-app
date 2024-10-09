const admin = require("firebase-admin");

interface upsertStudentProps {
  age?: number;
  firstName: string;
  lastName?: string;
  classroom?: string[];
  caregiver?: string[];
  caregiverEmail?: string[];
}

export const upsertStudent = async ({
  age,
  firstName,
  lastName,
  classroom,
  caregiver,
  caregiverEmail,
}: upsertStudentProps) => {
  let payload: any = {
    age,
    firstName,
    lastName,
    classroom,
    caregiver,
    caregiverEmail,
  };
  return admin.firestore().collection("student").add(payload);
};
