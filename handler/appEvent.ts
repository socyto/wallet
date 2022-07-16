import firebase from "../firebase";
export default {
  signIn: (data: any) => {
    const { provider, ...user } = data;
    if (provider === 'google') {
      firebase.signInWithGoogle();
    } else if (provider === 'facebook') {
      firebase.signInWithFacebook();
    } else if (provider === 'email') {
      firebase.signInEmailPassword(user);
    }
  },
  signUp: (event: any) => {
    firebase.signUpEmailPassword(event.data);
  },
  signOut: () => {
    firebase.signOut();
  },
}