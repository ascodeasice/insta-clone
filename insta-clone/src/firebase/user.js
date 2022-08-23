import { getAuth } from 'firebase/auth';
import { app } from './firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const userIsloggedIn = () => !!getAuth(app).currentUser;

const getUser = () => {
  return getAuth(app).currentUser;
}

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(app), provider);
}

export { userIsloggedIn, getUser, googleSignIn };
