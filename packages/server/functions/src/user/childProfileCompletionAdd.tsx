const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";

function toCamelCase(str: string) {
  return str.replace(/[-_ ]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
}

export const childProfileCompletionAdd = onCall(async (request) => {
  // todo: validation
  const {
    uid, // child's uid
    module, // eg Intruder
    moduleAdd, // how many games completed
    completionsAdd, // how many completions to add
  } = request.data;
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      completionPoints: admin.firestore.FieldValue.increment(completionsAdd),
      [toCamelCase(`completion ${module}`)]:
        admin.firestore.FieldValue.increment(moduleAdd),
    });
});
