// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getMessaging } from 'firebase/messaging';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
