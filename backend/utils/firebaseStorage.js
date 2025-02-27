import { initializeApp } from "firebase/app";

import multer from "multer";
import config from "../lib/firebaseConfig.js";

initializeApp(config.firebaseConfig);

const upload = multer({ storage: multer.memoryStorage() });

export { upload };
