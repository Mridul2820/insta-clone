import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// import { seedDatabase } from "../seed";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE,
    authDomain: "insta-clone-ab8df.firebaseapp.com",
    projectId: "insta-clone-ab8df",
    storageBucket: "insta-clone-ab8df.appspot.com",
    messagingSenderId: "272516493158",
    appId: "1:272516493158:web:d06325aa42b773f56e62a7",
    measurementId: "G-ZCZCRS4S5E"
}

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// console.log('firebase', firebase);

// seedDatabase(firebase)

export { firebase, FieldValue };
