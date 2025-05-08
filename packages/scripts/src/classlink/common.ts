// @ts-nocheck

/*
const axios = require('axios');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
*/

import axios from "axios";
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const optionDefinitions = [
  {
    name: "endpoint",
    alias: "e",
    description: "REST endpoint",
    type: String,
    defaultValue: "https://classlinkcertification3-vn-v2.rosterserver.com",
  },
  {
    name: "id",
    alias: "i",
    type: String,
    description: "client id",
    required: true,
  },
  {
    name: "secret",
    alias: "s",
    type: String,
    description: "client secret",
    required: true,
  },
  {
    name: "outDir",
    alias: "o",
    type: String,
    description: "output directory",
    required: true,
  },

  /*
  {
    name: '',
    type: String,
    description: ''
  },
  {
    name: '',
    type: String,
    description: ''
  },
  */
];

function validateRequiredOptions(options, args) {
  const errors = [];

  options.forEach((option) => {
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

export const args = commandLineArgs(optionDefinitions);
validateRequiredOptions(optionDefinitions, args);

const {
  endpoint,
  id: clientId,
  secret: clientSecret,
} = commandLineArgs(optionDefinitions);

const oauth = OAuth({
  consumer: {
    key: clientId,
    secret: clientSecret,
    endpoint,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

export const makeRequest = async (method, path, params = {}) => {
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
  } catch (error) {
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
