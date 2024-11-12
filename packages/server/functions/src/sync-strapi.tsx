const admin = require("firebase-admin");
import axios from "axios";
import { plural } from "pluralize";
import { onRequest } from "firebase-functions/v2/https";

type GetDoc = (args: { model: string; uuid: string }) => { [key: string]: any };

const getDoc: GetDoc = async ({ model, uuid }) => {
  const config = {
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  };
  const response = await axios.get(
    `${process.env.STRAPI_URL}/api/${plural(
      model,
    )}?filters[uuid][$eq]=${uuid}&pLevel`,
    config,
  );
  return response.data;
};

export const strapi = onRequest(
  async (
    {
      body: {
        event,
        model,
        entry: { uuid },
      },
    },
    response,
  ) => {
    switch (event) {
      case "entry.publish":
        const { data } = await getDoc({
          model,
          uuid,
        });
        if (data.length === 0) {
          // data is not actually published
          // so can ignore it
        } else {
          await admin.firestore().collection(model).doc(uuid).set(data[0]);
        }
        break;
      case "entry.delete":
      case "entry.unpublish":
        await admin.firestore().collection(model).doc(uuid).delete();
        break;
    }
    response.status(200).send();
    return;
  },
);
