WITH extracted_attempts AS (
  SELECT
    activityId,
    time,
    JSON_EXTRACT_ARRAY(data, '$.attempt') AS attempts
  FROM `bilingual-generation-dev.activities.raw`
  WHERE activityId = "2dc82579-85a5-488e-8bc6-ab18cc349b3c"
  AND type = "attempt"
),
flattened_attempts AS (
  SELECT
    activityId,
    time,
    JSON_EXTRACT_SCALAR(attempt, '$.card.isTarget') AS isTarget
  FROM extracted_attempts,
  UNNEST(attempts) AS attempt
),
accuracy_per_attempt AS (
  SELECT
    activityId,
    time,
    SAFE_DIVIDE(SUM(CASE WHEN isTarget = 'true' THEN 1 ELSE 0 END), COUNT(*)) * 100 AS accuracy
  FROM flattened_attempts
  GROUP BY activityId, time
),
max_accuracy AS (
  SELECT
    activityId,
    MAX(accuracy) AS max_accuracy,
    CASE
      WHEN MAX(accuracy) = 100.0 THEN 5
      WHEN MAX(accuracy) >= 90.0 THEN 4
      WHEN MAX(accuracy) >= 70.0 THEN 3
      WHEN MAX(accuracy) >= 50.0 THEN 2
      ELSE 1
    END AS max_stars
  FROM accuracy_per_attempt
  GROUP BY activityId
),
latest_attempt AS (
  SELECT
    activityId,
    accuracy AS latest_accuracy,
    CASE
      WHEN accuracy = 100.0 THEN 5
      WHEN accuracy >= 90.0 THEN 4
      WHEN accuracy >= 70.0 THEN 3
      WHEN accuracy >= 50.0 THEN 2
      ELSE 1
    END AS latest_stars
  FROM accuracy_per_attempt
  QUALIFY ROW_NUMBER() OVER (PARTITION BY activityId ORDER BY time DESC) = 1
)
SELECT
  max_accuracy.activityId,
  max_accuracy.max_accuracy,
  max_accuracy.max_stars,
  latest_attempt.latest_accuracy,
  latest_attempt.latest_stars
FROM max_accuracy
JOIN latest_attempt ON max_accuracy.activityId = latest_attempt.activityId;