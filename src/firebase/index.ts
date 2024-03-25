import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
// import "firebase/compat/messaging";
import "firebase/compat/storage";

// import { getMessaging } from "firebase/messaging";
import { options } from "./firebase.json";

const app = firebase.initializeApp(options);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
// export const messaging = firebase.messaging?.isSupported() ? getMessaging() : null;

export const firebaseOptions = options;
