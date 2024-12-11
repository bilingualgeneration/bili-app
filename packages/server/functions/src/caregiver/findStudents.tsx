const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const findStudentsByCaregiverEmail = async (email: string) => {
  const results = await admin
    .firestore()
    .collection("student")
    .where("caregiverEmail", "array-contains", email)
    .get();
  if (results.size === 0) {
    // no students found so return empty array
    return [];
  } else {
    // now need to find students with the classcode
    return (
      results.docs
        .map((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        })
        // TODO: need classroomId?
        //.filter((doc: any) => doc.classroom.includes(request.data.classroomId))
        .map((doc: any) => doc.id)
    );
  }
};

export const findStudents = onCall(async (request) => {
  return findStudentsByCaregiverEmail(request.data.email);
});
