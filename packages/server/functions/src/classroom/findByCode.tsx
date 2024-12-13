// TODO: check input

const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";

export const findByCode = onCall(async (request) => {
  return (
    await admin
      .database()
      .ref(`/classroomCodes/${request.data.code}`)
      .once("value")
  ).val();
});
