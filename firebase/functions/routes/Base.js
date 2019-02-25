const admin = require('firebase-admin');

module.exports = class Base {
  constructor() {
    // Firebaseのセットアップ
    const serviceAccount = require('../config/serviceAccount.json');
    const settingJson = JSON.parse(process.env.FIREBASE_CONFIG);
    settingJson.credential = admin.credential.cert(serviceAccount);
    admin.initializeApp(settingJson);
  }

  validateUser(token) {
    FirebaseFirestore.auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        return decodedToken.uid;
      })
      .catch(err => {
        console.error(err);
        return undefined;
      });
  }
};
