import * as caregiver from "./caregiver";
import * as classroom from "./classroom";
export * from "./debug";
import * as teacher from "./teacher";
import * as student from "./student";
import * as user from "./user";
import * as waitlist from "./waitlist";

import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export { caregiver, classroom, student, teacher, user, waitlist };
