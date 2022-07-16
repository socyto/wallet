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
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from '@env';




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
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
  console.log('signInWithFacebook');
  try {
    await Facebook.initializeAsync({appId: '904475463449983', appName: 'Ametiz' });

  } catch (error) {
    console.log("error");
  }
}

const signInWithGoogle = async () => {
  console.log("signInWithGoogle");
  try {
    var provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    signInWithRedirect(auth, provider);
  } catch (e) {
    console.log("eEEE", e);
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
    console.log("userCredential", user);
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