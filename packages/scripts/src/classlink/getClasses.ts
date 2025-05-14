// @ts-nocheck
import { writeFile } from "fs/promises";
const { args, makeRequest, repeatify } = require("./common.js");

const print = (json) => {
  console.log(JSON.stringify(json, null, 2));
};

const generateOrgLinkHash = ({ href, sourcedId, type }) => {
  return `${type}-${sourcedId}`;
};

makeRequest("get", "/ims/oneroster/v1p1/classes").then(async (response) => {
  const classes = response.data.classes.slice(0, 1).map((cl) => {
    cl.grades = repeatify(cl.grades);
    cl.subjects = repeatify(cl.subjects);
    cl.subjectCodes = repeatify(cl.subjectCodes);
    cl.periods = repeatify(cl.periods);
    cl.resources = repeatify(cl.periods);
    return cl;
  });

  await writeFile(
    `${args.outDir}/classes.json`,
    JSON.stringify(classes, null, 2),
  );

  return;
});
