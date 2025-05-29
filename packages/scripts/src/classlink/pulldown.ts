import axios from "axios";
import commandLineArgs from "command-line-args";
//import commandLineUsage from "command-line-usage";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { writeFile } from "fs/promises";

const optionDefinitions = [
  {
    name: "endpoint",
    description: "REST endpoint",
    type: String,
    defaultValue: "https://classlinkcertification3-vn-v2.rosterserver.com",
  },
  {
    name: "id",
    type: String,
    description: "client id",
    required: true,
  },
  {
    name: "secret",
    type: String,
    description: "client secret",
    required: true,
  },
  {
    name: "provider",
    type: String,
    description: "provider name eg ClassLink",
    required: true,
  },
  {
    name: "tenantId",
    type: String,
    description: "uid within provider",
    required: true,
  },
  {
    name: "directusUrl",
    type: String,
    description: "url for directus",
    required: true,
  },
  {
    name: "directusAuthToken",
    type: String,
    description: "auth token for Directus",
    required: true,
  },

  /*
     {
     name: '',
     type: String,
     description: ''
     },
   */
];

function validateRequiredOptions(options: any, args: any) {
  const errors: any[] = [];

  options.forEach((option: any) => {
    if (option.required && !args[option.name]) {
      errors.push(`--${option.name} (or -${option.alias}) is required`);
    }
  });

  if (errors.length > 0) {
    console.error("Error: Missing required options:");
    errors.forEach((error) => console.error(`  ${error}`));
    process.exit(1);
  }
}

const args = commandLineArgs(optionDefinitions);
validateRequiredOptions(optionDefinitions, args);

const {
  endpoint,
  id: clientId,
  secret: clientSecret,
} = commandLineArgs(optionDefinitions);

// @ts-ignore
const oauth = OAuth({
  consumer: {
    key: clientId,
    secret: clientSecret,
    endpoint,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string: string, key: any) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

const makeRequest = async (method: any, path: string, params: any = {}) => {
  try {
    const url = `${endpoint}${path}`;
    const requestData = { url, method };
    const headers = oauth.toHeader(oauth.authorize(requestData));

    const config = {
      method,
      url,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: method === "GET" ? params : {},
      data: method !== "GET" ? params : {},
    };

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response
        ? `Status: ${error.response.status}\nData: ${JSON.stringify(
            error.response.data,
            null,
            2,
          )}`
        : error.message,
    };
  }
};

const repeatify = (array: string[]) => {
  if (array === undefined || array.length === 0) {
    return undefined;
  } else {
    return array.map((item) => ({
      value: item,
    }));
  }
};

const relationify = (obj: any) => {
  return Object.keys(obj).length === 0
    ? []
    : [{ ...obj, sourcedId: prependSourcedId(obj.sourcedId) }];
};

const prependSourcedId = (uid: string) => {
  return `${args["provider"]}-${args["tenantId"]}-${uid}`;
};

const checkIfExists = async ({ collection, sourcedId }: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${args["directusAuthToken"]}`,
  };
  try {
    const existsResponse = await axios.get(
      `${args["directusUrl"]}/items/${collection}?filter={"sourcedId": {"_eq": "${sourcedId}"}}`,
      { headers },
    );
    return existsResponse.data.data.length > 0;
  } catch (error: any) {
    //console.log(collection);
    console.log(error.response.data.errors);
  }
};

const uploadToDirectus = async ({ collection, item }: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${args["directusAuthToken"]}`,
  };
  try {
    const exists = await checkIfExists({
      collection,
      sourcedId: item.sourcedId,
    });
    if (exists) {
      console.log(`updating ${collection}/${item.sourcedId}`);
      await axios.patch(
        `${args["directusUrl"]}/items/${collection}/${item.sourcedId}`,
        item,
        { headers },
      );
    } else {
      console.log(`inserting ${collection}/${item.sourcedId}`);
      await axios.post(`${args["directusUrl"]}/items/${collection}`, item, {
        headers,
      });
    }
  } catch (error: any) {
    console.log(item);
    //console.log(error);
    //console.log(collection, item.sourcedId);
    console.log(error.response.data.errors);
  }
};

const pullAll = async (func: any) => {
  let offset = 0;
  let responses = -1;
  do {
    responses = await func(offset);
    offset += responses;
  } while (responses > 0);
};

const run = async () => {
  await pullAll(async (offset: any) => {
    const academicSessionsResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/academicSessions/?offset=${offset}`,
    );
    for (const academicSession of academicSessionsResponse.data
      .academicSession) {
      academicSession.children = academicSession.children.map((child: any) => {
        return {
          ...child,
          sourcedId: prependSourcedId(child.sourcedId),
        };
      });
      academicSession.sourcedId = prependSourcedId(academicSession.sourcedId);
      academicSession.parent = relationify(academicSession.parent);
      await uploadToDirectus({
        collection: "oneRosterAcademicSessions",
        item: academicSession,
      });
    }
    return academicSessionsResponse.data.academicSession.length;
  });

  await pullAll(async (offset: any) => {
    const orgsResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/orgs/?offset=${offset}`,
    );
    for (const org of orgsResponse.data.org) {
      org.sourcedId = prependSourcedId(org.sourcedId);
      org.parent = relationify(org.parent);
      org.children = org.children.map((child: any) => {
        return {
          ...child,
          sourcedId: prependSourcedId(child.sourcedId),
        };
      });
      await uploadToDirectus({
        collection: "oneRosterOrgs",
        item: org,
      });
    }
    return orgsResponse.data.org.length;
  });

  await pullAll(async (offset: any) => {
    const coursesResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/courses/?offset=${offset}`,
    );
    for (const course of coursesResponse.data.course) {
      course.sourcedId = prependSourcedId(course.sourcedId);
      if (Object.keys(course.schoolYear).length === 0) {
        delete course.schoolYear;
      } else {
        course.schoolYear = prependSourcedId(course.schoolYear.sourcedId);
      }
      course.grades = repeatify(course.grades);
      course.subjects = repeatify(course.subjects);
      course.subjectCodes = repeatify(course.subjectCodes);
      course.resources = repeatify(course.periods);
      course.org = prependSourcedId(course.org.sourcedId);
      await uploadToDirectus({
        collection: "oneRosterCourses",
        item: course,
      });
    }
    return coursesResponse.data.course.length;
  });

  await pullAll(async (offset: any) => {
    const classesResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/classes/?offset=${offset}`,
    );
    for (const cl of classesResponse.data.class) {
      cl.course = prependSourcedId(cl.course.sourcedId);
      cl.school = prependSourcedId(cl.school.sourcedId);
      cl.terms = cl.terms.map((t: any) => {
        const termId = prependSourcedId(t.sourcedId);
        const classId = prependSourcedId(cl.sourcedId);
        return {
          id: [termId, classId].sort().join(":"),
          class_sourcedId: classId,
          academicSession_sourcedId: termId,
        };
      });
      cl.sourcedId = prependSourcedId(cl.sourcedId);
      cl.grades = repeatify(cl.grades);
      cl.subjects = repeatify(cl.subjects);
      cl.subjectCodes = repeatify(cl.subjectCodes);
      cl.periods = repeatify(cl.periods);
      cl.resources = repeatify(cl.periods);
      await uploadToDirectus({
        collection: "oneRosterClasses",
        item: cl,
      });
    }

    return classesResponse.data.class.length;
  });

  await pullAll(async (offset: any) => {
    const usersResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/users/?offset=${offset}`,
    );
    for (let user of usersResponse.data.user) {
      user.orgs = user.orgs.map((org: any) => {
        const orgId = prependSourcedId(org.sourcedId);
        const userId = prependSourcedId(user.sourcedId);
        return {
          id: [orgId, userId].sort().join(":"),
          user_sourcedId: userId,
          org_sourcedId: orgId,
        };
      });
      user.sourcedId = prependSourcedId(user.sourcedId);
      user.grades = user.grades.map((grade: string) => ({
        value: grade,
      }));

      // TODO: make related to user?
      user.agents = user.agents.map((agent: string) => ({
        sourcedId: prependSourcedId(agent),
      }));
      await uploadToDirectus({
        collection: "oneRosterUsers",
        item: user,
      });
    }

    return usersResponse.data.user.length;
  });

  await pullAll(async (offset: any) => {
    const enrollmentsResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/enrollments/?offset=${offset}`,
    );
    for (let enrollment of enrollmentsResponse.data.enrollment) {
      enrollment.sourcedId = prependSourcedId(enrollment.sourcedId);
      enrollment.user = prependSourcedId(enrollment.user.sourcedId);
      enrollment.class = prependSourcedId(enrollment.class.sourcedId);
      enrollment.school = prependSourcedId(enrollment.school.sourcedId);
      await uploadToDirectus({
        collection: "oneRosterEnrollments",
        item: enrollment,
      });
    }

    return enrollmentsResponse.data.enrollment.length;
  });
};

run().then(() => {
  console.log("done");
});
