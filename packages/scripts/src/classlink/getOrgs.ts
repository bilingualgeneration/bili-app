// @ts-nocheck
import { writeFile } from "fs/promises";
const { args, makeRequest, relationify } = require("./common.js");

makeRequest("get", "/ims/oneroster/v1p1/orgs").then(async (response) => {
  const orgs = response.data.orgs.map((org) => {
    org.parent = relationify(org.parent);
    return org;
  });
  await writeFile(`${args.outDir}/orgs.json`, JSON.stringify(orgs, null, 2));
});
