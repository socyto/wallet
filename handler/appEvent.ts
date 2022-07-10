import firebase from "../firebase";
export default {
  signIn: (event: any) => {
    const provider = event.data.provider;
    if (provider === 'google') {
      firebase.signInWithGoogle();
    } else if (provider === 'facebook') {
      firebase.signInWithFacebook();
    } else if (provider === 'email') {
      firebase.signInEmailPassword(event.data);
    }
  },
  signUp: (event: any) => {
    firebase.signUpEmailPassword(event.data);
  },
  signOut: () => {
    firebase.signOut();
  },
}