import * as classroom from './classroom';
import * as teacher from './teacher';
import * as user from './user';

import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});

export {
  classroom,
  teacher,
  user,
};
