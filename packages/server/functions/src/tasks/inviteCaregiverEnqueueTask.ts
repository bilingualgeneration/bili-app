const functions = require("firebase-functions");
const { CloudTasksClient } = require("@google-cloud/tasks");

const project = "bilingual-generation-live";
const queue = "invite-caregivers";
const loc = "us-central1";
const client = new CloudTasksClient();

export const enqueueTask = async (payload) => {
  try {
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

    const parent = client.queuePath(project, loc, queue);

    // Send task to Cloud Tasks
    const [response] = await client.createTask({ parent, task });
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
