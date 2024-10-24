import { onCall } from "firebase-functions/v2/https";
import { BigQuery } from "@google-cloud/bigquery";

const bigquery = new BigQuery();

export interface StudentActivityLogsRead {
  id: string;
  lastTimestamp?: string;
}

export const read = onCall(async (request) => {
  const timestamp = request.data.lastTimestamp
    ? `'${request.data.lastTimestamp}'`
    : "CURRENT_TIMESTAMP()";
  const query = `SELECT *
FROM \`bilingual-generation-dev.activities.raw\`
WHERE userId = '${request.data.id}'
AND timestamp < ${timestamp}
ORDER BY timestamp DESC
LIMIT 10`;
  const [rows] = await bigquery.query({
    query,
    location: "US",
  });
  return rows;
});
