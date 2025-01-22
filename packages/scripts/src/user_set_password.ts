const admin = require("firebase-admin");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

// Load the config YAML file
const configPath = path.join(__dirname, "./data/user_set_password.yaml");
let config;
try {
  config = yaml.load(fs.readFileSync(configPath, "utf8"));
} catch (error: any) {
  console.error("Error loading config file:", error);
  process.exit(1);
}

const environment = config.environment;
const userId = config.userid;
const newPassword = config.password;

if (!environment || !userId || !newPassword) {
  console.error("Missing required fields in config file.");
  process.exit(1);
}

// Determine which credentials to load
const credentialsPath =
  environment === "dev"
    ? "./serviceAccounts/dev.json"
    : "./serviceAccounts/live.json";

let serviceAccount;
try {
  serviceAccount = require(credentialsPath);
} catch (error: any) {
  console.error(
    `Error loading Firebase credentials from ${credentialsPath}:`,
    error,
  );
  process.exit(1);
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Set the user's password
admin
  .auth()
  .updateUser(userId, { password: newPassword })
  .then(() => {
    console.log(`Password updated successfully for user: ${userId}`);
  })
  .catch((error: any) => {
    console.error("Error updating password:", error);
  });
