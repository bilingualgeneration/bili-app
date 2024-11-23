const admin = require("firebase-admin");
import { onRequest } from "firebase-functions/v2/https";

export const generateReports = onRequest(async (request, response) => {
  const db = admin.firestore();
  const classroomCollection = db.collection("classroom");
  const activeClassroomsQuery = classroomCollection.where(
    "isActive",
    "==",
    true,
  );

  const activeClassrooms = await activeClassroomsQuery.get();

  const studentCollection = db.collection("student");

  const tasks: Promise<any>[] = [];

  activeClassrooms.forEach(async (doc: any) => {
    const classroomStudentQuery = studentCollection.where(
      "classroom",
      "array-contains",
      doc.id,
    );
    const students = await classroomStudentQuery.get();
    const studentAnalytics: { [key: string]: any } = {};
    students.forEach((studentDoc: any) => {
      studentAnalytics[studentDoc.id] = {
        highlights: [],
        id: studentDoc.id,
        languageBreakdown: {
          en: 0,
          es: 0,
          esen: 0,
        },
        needs: [],
        tags: [],
        timeBreakdown: {
          atHome: 0,
          atSchool: 0,
        },
      };
    });
    // get matching classroomAnalytics id
    const classroomAnalyticsQuery = db
      .collection("classroomAnalytics")
      .where("classroom", "==", doc.id);
    const classroomAnalyticsDoc = await classroomAnalyticsQuery.get();
    if (!classroomAnalyticsDoc.empty) {
      // console.log(`${classroomAnalyticsDoc.docs[0].id} -> ${doc.id}`);

      tasks.push(
        db
          .collection("classroomAnalytics")
          .doc(doc.id)
          .update({ studentAnalytics }),
      );
    }
  });
  await Promise.all(tasks);
});
