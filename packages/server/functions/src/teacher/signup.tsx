const admin = require('firebase-admin');
import { onCall } from 'firebase-functions/v2/https';
//import * as logger from 'firebase-functions/logger';

export const signup = onCall(async (request) => {
  /*
     create teacher account
     need to attach to school
     don't create example classroom
     don't create example student
  */

  const profileBlankDefaults: any = {
    country: null,
    dailyPlaytimeLimit: 'unlimited',
    dob: null,
    isInclusive: false,
    phone: null
  }
  
  let profile: any = Object.assign(
    profileBlankDefaults,
    {
      role: 'teacher',
      name: request.data.name,
      language: request.data.language,
      school: {
	grades: request.data.grades,
	name: request.data.schoolName,
	roles: request.data.schoolRoles,
      }
  });

  const emailDomain = request.data.email.trim().toLowerCase().split('@')[1];

  const schoolQuery = (await admin.firestore().collection('school').where(
    'emailDomains',
    'array-contains',
    emailDomain
  ).get()).docs;


  switch(schoolQuery.length){
    case 0:
      // create it?
      break;
    case 1:
      profile.school.id = schoolQuery[0].id;
      break;
    default:
      // todo: what to do here?
      break;
  }

  const userRecord = await admin.auth().createUser({
    email: request.data.email,
    password: request.data.password,
    disabled: false,
    emailVerified: false,
  });
  const uid: string = userRecord.uid;

  await Promise.all([
    admin.firestore().collection('user').doc(uid).set(profile),
  ]);

});
