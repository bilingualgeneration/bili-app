const functions = require("firebase-functions");
const { CloudTasksClient } = require("@google-cloud/tasks");

const project = "bilingual-generation-live";
const queue = "invite-caregivers";
const loc = "us-central1";
const client = new CloudTasksClient();

export const enqueueTask = functions.https.onRequest(
  async (req: any, res: any) => {
    try {
      const payload = req.body; // Task payload from request

      // Construct the task
      const task = {
        httpRequest: {
          httpMethod: "POST",
          url: `https://${loc}-${project}.cloudfunctions.net/trigger-inviteCaregiverTaskDaemon`,
          body: Buffer.from(JSON.stringify(payload)).toString("base64"),
          headers: {
            "Content-Type": "application/json",
          },
        },
      };

      // Get queue path
      const parent = client.queuePath(project, loc, queue);

      // Send task to Cloud Tasks
      const [response] = await client.createTask({ parent, task });
      res.status(200).send(`Task ${response.name} created.`);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).send("Error creating task");
    }
  },
);
