// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,//Enter your api key
  authDomain: "notification-bf689.firebaseapp.com",
  projectId: "notification-bf689",
  storageBucket: "notification-bf689.appspot.com",
  messagingSenderId: "545378563400",
  appId: "1:545378563400:web:419f9c900eeac28699af7d",
  measurementId: "G-VSN3QW1HC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
export const requestForToken = () => {
    return getToken(messaging, { vapidKey: process.env.REACT_APP_vapidKey })//Enter your vapid key
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.error('An error occurred while retrieving token. ', err);
      });
  };
  
  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });