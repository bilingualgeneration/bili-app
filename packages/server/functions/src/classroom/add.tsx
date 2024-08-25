const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";

/*
   name
   grades str[]
   language
   allowLanguageToggle
   isInclusive
   students
   notificationMethod
*/

const getUserByEmail = async (email: string) => {
  try {
    const response: any = await admin.auth().getUserByEmail(email);
    return response.toJSON();
  } catch (error: any) {
    return null;
  }
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
  let classroomPayload = {
    allowLanguageToggle: data.allowLanguageToggle,
    grades: data.grades,
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
    // todo: check if student already exists
    const caregiver1 = await getUserByEmail(student.primaryContactEmail);
    const caregiver2 = await getUserByEmail(student.secondaryContactEmail);
    if (caregiver1 === null) {
      // todo: create parent account
    }

    if (caregiver2 === null) {
      // todo: create parent account
    }

    // todo: check if student account already exists
    tasks.push(
      admin
        .firestore()
        .collection("student")
        .add({
          firstName: student.firstName,
          lastName: student.lastName,
          classroom: [classroomId],
        }),
    );
  }

  tasks.push(
    admin
      .firestore()
      .collection("classroomAnalytics")
      .add({
        classroom: classroomId,
        studentNeeds: [],
        studentHighlights: [],
        learningTimeSummary: {
          stories: {
            atSchool: 0, // in minutes
            atHome: 0,
          },
          wellness: {
            atSchool: 0,
            atHome: 0,
          },
          games: {
            atSchool: 0,
            atHome: 0,
          },
          community: {
            atSchool: 0,
            atHome: 0,
          },
        },
        /*
       studentNeeds
       - student, percent, area
       studentHighlights
       - student, area
       learningTimeSummary
       - stories, wellness, games, community
         - atSchool, atHome
    */
      }),
  );

  await Promise.all(tasks);
});
