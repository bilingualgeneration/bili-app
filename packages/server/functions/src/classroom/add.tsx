const admin = require("firebase-admin");
import { upsertStudent } from "../student/upsert";
import { onCall } from "firebase-functions/v2/https";
import type {
  ClassroomAnalytics,
  TimeSpentAtLocation,
  TimeBreakdownByLanguage,
} from "@/schema/classroomAnalytics";

const emptyTimeBreakdownByLanguage: TimeBreakdownByLanguage = {
  en: -1,
  es: -1,
  esen: -1,
};

const emptyTimeSpentAtLocation: TimeSpentAtLocation = {
  community: emptyTimeBreakdownByLanguage,
  games: emptyTimeBreakdownByLanguage,
  stories: emptyTimeBreakdownByLanguage,
  wellness: emptyTimeBreakdownByLanguage,
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
    studentNeeds: [],
    studentHighlights: [],
  };

  let classroomPayload = {
    allowLanguageToggle: data.allowLanguageToggle,
    grades: data.grades,
    isActive: true,
    isInclusive: data.isInclusive,
    language: data.language,
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

  for (const student of data.students) {
    // todo: check if student account already exists
    tasks.push(
      upsertStudent({
        firstName: student.firstName,
        lastName: student.lastName,
        classroom: [classroomId],
        caregiverEmail: [
          student.primaryContactEmail,
          student.secondaryContactEmail,
        ],
      }),
    );
  }

  tasks.push(
    admin.firestore().collection("classroomAnalytics").add(analyticsPayload),
  );

  await Promise.all(tasks);
});
