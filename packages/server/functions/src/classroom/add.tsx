const admin = require("firebase-admin");
import { upsertStudent } from "../student/upsert";
import { onCall } from "firebase-functions/v2/https";
import type { Classroom } from "@/schema/classroom";
import type {
  ClassroomAnalytics,
  ClassroomStudentAnalytics,
  TimeSpentAtLocation,
} from "@/schema/classroomAnalytics";

const emptyTimeSpentAtLocation: TimeSpentAtLocation = {
  community: 0,
  games: 0,
  stories: 0,
  wellness: 0,
};

export const add = onCall(async (request) => {
  // todo: verify that teacher is logged in
  const uid: string = request.auth!.uid;
  const profile = (
    await admin.firestore().collection("user").doc(uid).get()
  ).data();

  // todo: check that school exists!
  //const school = (await admin.firestore().collection('school').doc(profile.school.id).get()).data();
  const { data } = request;

  const classroomId = admin.firestore().collection("scrap").doc().id;
  let tasks: any[] = [];

  let studentAnalytics: ClassroomStudentAnalytics = {};

  for (const student of data.students) {
    // todo: check if student account already exists
    const id = await upsertStudent({
      firstName: student.firstName,
      lastName: student.lastName,
      classroom: [classroomId],
      caregiverEmail: [
        student.primaryContactEmail,
        student.secondaryContactEmail,
      ],
    });
    studentAnalytics[id] = {
      id,
      highlights: [],
      needs: [],
      tags: [{ tag: "-home account inactive" }],
      languageBreakdown: {
        es: 0,
        en: 0,
        esen: 0,
      },
      timeBreakdown: {
        atHome: 0,
        atSchool: 0,
      },
    };
  }

  let analyticsPayload: ClassroomAnalytics = {
    classroom: classroomId,
    timeBreakdown: {
      atHome: emptyTimeSpentAtLocation,
      atSchool: emptyTimeSpentAtLocation,
    },
    studentBreakdown: {
      atHome: [],
      atSchool: [],
    },
    studentAnalytics,
  };

  let classroomPayload: Classroom = {
    allowLanguageToggle: data.allowLanguageToggle,
    allowedLanguages: data.allowedLanguages,
    grades: data.grades,
    isActive: true,
    isInclusive: data.isInclusive,
    name: data.name,
    school: profile.school.id,
    size: data.students.length,
    teachers: [uid],
  };

  tasks.push(
    admin
      .firestore()
      .collection("classroom")
      .doc(classroomId)
      .set(classroomPayload),
  );

  tasks.push(
    admin
      .firestore()
      .collection("classroomAnalytics")
      .doc(classroomId)
      .set(analyticsPayload),
  );

  await Promise.all(tasks);
});
