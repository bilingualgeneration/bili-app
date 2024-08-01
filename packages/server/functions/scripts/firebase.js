const admin = require('firebase-admin');

admin.initializeApp({
  projectId: 'bilingual-generation-dev'
});

const firestoreEmulator = admin.firestore();
firestoreEmulator.settings({
  host: 'localhost:8080',
  ssl: false
});

const firestore = admin.firestore();

module.exports = {
    firestore,
    firestoreEmulator
}
