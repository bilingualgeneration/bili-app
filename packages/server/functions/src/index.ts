import * as user from './user';
import * as teacher from './teacher';

import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});

export {
  teacher,
  user,
};
