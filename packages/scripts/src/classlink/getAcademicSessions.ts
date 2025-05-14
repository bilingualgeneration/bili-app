// @ts-nocheck
import { writeFile } from "fs/promises";
const { args, makeRequest, relationify } = require("./common.js");

const print = (json) => {
  console.log(JSON.stringify(json, null, 2));
};

makeRequest("get", "/ims/oneroster/v1p1/academicSessions").then(
  async (response) => {
    const academicSessions = response.data.academicSessions.map(
      (academicSession) => {
        academicSession.parent = relationify(academicSession.parent);
        return academicSession;
      },
    );
    await writeFile(
      `${args.outDir}/academicSessions.json`,
      JSON.stringify(academicSessions, null, 2),
    );
  },
);
