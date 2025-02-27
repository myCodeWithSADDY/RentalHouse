import * as dotenv from "dotenv";

dotenv.config();

export default {
  firebaseConfig: {
    apiKey: process.env.FB_APi_KEY,
    authDomain: process.env.Auth_Domain,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASURE_ID,
  },
};
