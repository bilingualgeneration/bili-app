import * as caregiver from "./caregiver";
import * as classroom from "./classroom";
export * from "./debug";
import * as teacher from "./teacher";
import * as scheduled from "./scheduled";
import * as student from "./student";
import * as user from "./user";
import * as waitlist from "./waitlist";
import * as sync from "./sync-strapi";

import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export {
  caregiver,
  classroom,
  scheduled,
  student,
  sync,
  teacher,
  user,
  waitlist,
};
