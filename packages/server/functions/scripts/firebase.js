const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingual-generation-dev-default-rtdb.firebaseio.com",
});

module.exports = {
  firestore: admin.firestore(),
};
