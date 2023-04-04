// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW8_rSMNkPUTmoUiB1163xl2q-hm7vA6w",
  authDomain: "react-native-project-2bcee.firebaseapp.com",
  projectId: "react-native-project-2bcee",
  storageBucket: "react-native-project-2bcee.appspot.com",
  messagingSenderId: "780004367926",
  appId: "1:780004367926:web:94d4927d1d29724619c297",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
