import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './firebase-config';

const userIsloggedIn = () => !!getAuth(app).currentUser;

const getUser = () => {
  return getAuth(app).currentUser;
}

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(app), provider);
}

const signOutUser = () => {
  signOut(getAuth(app));
}

export { userIsloggedIn, getUser, googleSignIn, signOutUser };
