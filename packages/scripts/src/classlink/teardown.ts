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

const checkIfIdExists = async ({ collection, id }: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${args["directusAuthToken"]}`,
  };
  try {
    const existsResponse = await axios.get(
      `${args["directusUrl"]}/items/${collection}?filter={"id": {"_eq": "${id}"}}`,
      { headers },
    );
    return existsResponse.data.data.length > 0;
  } catch (error: any) {
    //console.log(collection);
    console.log(error.response.data.errors);
  }
};

const deleteFromDirectus = async ({ collection, sourcedId, id }: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${args["directusAuthToken"]}`,
  };
  try {
    const exists = sourcedId
      ? await checkIfExists({
          collection,
          sourcedId,
        })
      : await checkIfIdExists({
          collection,
          id,
        });
    if (exists) {
      console.log(`deleting ${collection}/${sourcedId || id}`);
      await axios.delete(
        `${args["directusUrl"]}/items/${collection}/${sourcedId || id}`,
        { headers },
      );
    } else {
      console.log(`cannot find ${collection}/${sourcedId || id}`);
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
    const enrollmentsResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/enrollments/?offset=${offset}`,
    );
    for (let enrollment of enrollmentsResponse.data.enrollment) {
      await deleteFromDirectus({
        collection: "oneRosterEnrollments",
        sourcedId: prependSourcedId(enrollment.sourcedId),
      });
    }
    return enrollmentsResponse.data.enrollment.length;
  });

  await pullAll(async (offset: any) => {
    const usersResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/users/?offset=${offset}`,
    );
    for (let user of usersResponse.data.user) {
      for (const org of user.orgs) {
        await deleteFromDirectus({
          collection: "oneRosterUsersOrgs",
          id: [
            prependSourcedId(org.sourcedId),
            prependSourcedId(user.sourcedId),
          ]
            .sort()
            .join(":"),
        });
      }
      await deleteFromDirectus({
        collection: "oneRosterUsers",
        sourcedId: prependSourcedId(user.sourcedId),
      });
    }
    return usersResponse.data.user.length;
  });

  await pullAll(async (offset: any) => {
    const classesResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/classes/?offset=${offset}`,
    );
    for (const cl of classesResponse.data.class) {
      for (const term of cl.terms) {
        await deleteFromDirectus({
          collection: "oneRosterClassesAcademicSessions",
          id: [prependSourcedId(cl.sourcedId), prependSourcedId(term.sourcedId)]
            .sort()
            .join(":"),
        });
      }
      await deleteFromDirectus({
        collection: "oneRosterClasses",
        sourcedId: prependSourcedId(cl.sourcedId),
      });
    }
    return classesResponse.data.class.length;
  });

  await pullAll(async (offset: any) => {
    const coursesResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/courses/?offset=${offset}`,
    );
    for (const course of coursesResponse.data.course) {
      await deleteFromDirectus({
        collection: "oneRosterCourses",
        sourcedId: prependSourcedId(course.sourcedId),
      });
    }
    return coursesResponse.data.course.length;
  });

  await pullAll(async (offset: any) => {
    const orgsResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/orgs/?offset=${offset}`,
    );
    for (const org of orgsResponse.data.org) {
      await deleteFromDirectus({
        collection: "oneRosterOrgs",
        sourcedId: prependSourcedId(org.sourcedId),
      });
    }
    return orgsResponse.data.org.length;
  });

  await pullAll(async (offset: any) => {
    const academicSessionsResponse = await makeRequest(
      "get",
      `/ims/oneroster/v1p1/academicSessions/?offset=${offset}`,
    );
    for (const academicSession of academicSessionsResponse.data
      .academicSession) {
      await deleteFromDirectus({
        collection: "oneRosterAcademicSessions",
        sourcedId: prependSourcedId(academicSession.sourcedId),
      });
    }
    return academicSessionsResponse.data.academicSession.length;
  });
};

run().then(() => {
  console.log("done");
});
