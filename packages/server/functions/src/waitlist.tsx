import { onCall } from "firebase-functions/v2/https";
import { BigQuery } from "@google-cloud/bigquery";

const bigquery = new BigQuery();

export const add = onCall(async (request) => {
  // TODO: error handling
  await bigquery
    .dataset("waitlist")
    .table("signups")
    .insert([
      {
        timestamp: new Date(),
        ...request.data,
      },
    ]);
});
