// @ts-nocheck
import { writeFile } from "fs/promises";
const { args, makeRequest, repeatify, relationify } = require("./common.js");

const print = (json) => {
  console.log(JSON.stringify(json, null, 2));
};

const generateOrgLinkHash = ({ href, sourcedId, type }) => {
  return `${type}-${sourcedId}`;
};

makeRequest("get", "/ims/oneroster/v1p1/courses").then(async (response) => {
  const courses = response.data.courses.map((course) => {
    if (Object.keys(course.schoolYear).length === 0) {
      delete course.schoolYear;
    } else {
      course.schoolYear = course.schoolYear.sourcedId;
    }
    course.grades = repeatify(course.grades);
    course.subjects = repeatify(course.subjects);
    course.subjectCodes = repeatify(course.subjectCodes);
    course.resources = repeatify(course.periods);
    return course;
  });

  await writeFile(
    `${args.outDir}/courses.json`,
    JSON.stringify(courses, null, 2),
  );

  return;
});
