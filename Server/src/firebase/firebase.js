import admin from 'firebase-admin';
import serviceAccount from './firebasekey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
