const { error } = require("firebase-functions/logger");

const admin = require("firebase-admin");
import { onCall } from "firebase-functions/v2/https";
import { BigQuery } from "@google-cloud/bigquery";

const bigquery = new BigQuery();

export const create = onCall(
  async ({
    data: {
      activity,
      activityId,
      userId,
      timeSpent,
      category,
      questionId,
      response,
      language,
      classroomId,
    },
  }) => {
    // TODO: error handling
    const db = admin.database();
    let ref = db.ref(`/users/${userId}/${classroomId ? "classroom" : "home"}`);
    if (classroomId !== null) {
      ref = ref.child(`/${classroomId}`);
    }
    const activityRef = ref.child(`/activities/${activity}/${activityId}`);
    try {
      await bigquery
        .dataset("activities")
        .table("raw")
        .insert([
          {
            activity,
            activityId,
            userId,
            timestamp: new Date(),
            timeSpent,
            version: "0.0.1", // TODO: don't hardcode
            type: "attempt",
            data: JSON.stringify({
              category,
              questionId,
              response,
            }),
            language,
            classroomId,
          },
        ]);
    } catch (e: any) {
      error(JSON.stringify(e));
    }
    const tasks = [
      db.ref(`/users/${userId}/totalHearts`).transaction((current: any) => {
        return (current || 0) + 1;
      }),
      ref.child("totalHearts").transaction((current: any) => {
        return (current || 0) + 1;
      }),
      activityRef.child("/heartsEarned").transaction((current: any) => {
        return (current || 0) + 1;
      }),
    ];
    await Promise.all(tasks);
  },
);
