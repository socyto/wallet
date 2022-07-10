import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import * as Facebook from 'expo-facebook';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH-FjBhWky_amWZFHSWrXJkfg97UPqHTA",
  authDomain: "ametiz.firebaseapp.com",
  projectId: "ametiz",
  storageBucket: "ametiz.appspot.com",
  messagingSenderId: "551444345235",
  appId: "1:551444345235:web:baff775c94389283f3b866",
  measurementId: "G-KYRERT3N82"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('We are authenticated now!');
  }
  // Do other things
});

const signInWithFacebook = async () => {
  try {
    await Facebook.initializeAsync({appId: '904475463449983', appName: 'Ametiz' });

  } catch (error) {
    console.log("error");
  }
}

const signInWithGoogle = async () => {
  try {
    var provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    signInWithRedirect(auth, provider);
  } catch (e) {
    return { error: true };
  }
}


const signUpEmailPassword = async (event: { email: string; password: string }) => {
  try {
    const { email, password } = event;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}

const signInEmailPassword = async (event: { email: string; password: string }) => {
  try {
    const { email, password } = event;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}

export default {
  auth,
  signOut: () => signOut(auth),
  signInWithGoogle,
  signInWithFacebook,
  signInEmailPassword,
  signUpEmailPassword,
};