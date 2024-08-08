const admin = require('firebase-admin');
import { onCall } from 'firebase-functions/v2/https';

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
  try{
    const response: any = await admin.auth().getUserByEmail(email);
    return response.toJSON();
  }catch(error: any){
    return null;
  }
}

export const add = onCall(async (request) => {
  // todo: verify that teacher is logged in
  const uid: string = request.auth!.uid;
  const profile = (await admin.firestore().collection('users').doc(uid).get()).data();

  // todo: check that school exists!
  //const school = (await admin.firestore().collection('schools').doc(profile.school.id).get()).data();
  const {data} = request;

  const classroomId = admin.firestore().collection('scrap').doc().id;
  let tasks: any[] = [];
  let classroomPayload = {
    name: data.name,
    grades: data.grades,
    language: data.language,
    allowLanguageToggle: data.allowLanguageToggle,
    isInclusive: data.isInclusive,
    school: profile.school.id,
    teachers: [uid]
  }

  tasks.push(admin.firestore().collection('classrooms').doc(classroomId).set(classroomPayload));
  
  for(const student of data.students){
    // todo: check if student already exists
    const caregiver1 = await getUserByEmail(student.primaryContactEmail);
    const caregiver2 = await getUserByEmail(student.secondaryContactEmail);
    if(caregiver1 === null){
      // todo: create parent account
    }

    if(caregiver2 === null){
      // todo: create parent account
    }

    // todo: check if student account already exists
    tasks.push(admin.firestore().collection('students').add({
      firstName: student.firstName,
      lastName: student.lastName,
      classrooms: [classroomId]
    }));
  }

  await Promise.all(tasks);
});
