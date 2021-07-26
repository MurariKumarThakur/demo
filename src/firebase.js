import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyBlFCtOer40FmIMV2q2ZV7YiWl9uqIKeSc",
  authDomain: "passwordmanager-540a9.firebaseapp.com",
  projectId: "passwordmanager-540a9",
  storageBucket: "passwordmanager-540a9.appspot.com",
  messagingSenderId: "33248438185",
  appId: "1:33248438185:web:306fce3ef544dbee8d06b8",
});
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
// export const storage=firebase.storage()
