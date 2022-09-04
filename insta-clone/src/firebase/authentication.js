import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './firebase-config';

const userIsLoggedIn = () => !!getAuth(app).currentUser;

const getUser = () => {
  return getAuth(app).currentUser;
}

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  await signInWithPopup(getAuth(app), provider);
}

const signOutUser = () => {
  signOut(getAuth(app));
}

const getUid = () => {
  if (!userIsLoggedIn()) {
    return null;
  }
  return getUser().uid;
}

export { userIsLoggedIn, getUser, googleSignIn, signOutUser, getUid };
