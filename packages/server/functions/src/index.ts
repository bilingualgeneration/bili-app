import {classroom} from './classroom';
import {school} from './school';
import * as user from './user';

import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export {
  classroom,
  school,
  user,
};
