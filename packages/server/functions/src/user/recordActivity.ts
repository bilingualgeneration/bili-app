import { onCall } from "firebase-functions/v2/https";
import { BigQuery } from "@google-cloud/bigquery";

const bigquery = new BigQuery();

const datasetId = "activities";
const tableId = "raw";

export const recordActivity = onCall(async (request) => {
  const rows = [request.data];

  try {
    await bigquery.dataset(datasetId).table(tableId).insert(rows);
    console.log(`Inserted ${rows.length} rows into bigquery`);
  } catch (error: any) {
    console.error("Error inserting rows into BigQuery:", error);

    // Check for partial failure errors
    if (error.name === "PartialFailureError") {
      console.error("Partial failure error details:", error.errors);

      error.errors.forEach((err: any) => {
        console.error("Row with error:", err.row);
        err.errors.forEach((e: any) => {
          console.error("Error details:", e);
        });
      });
    }
  }
});
