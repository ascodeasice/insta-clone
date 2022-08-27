import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { app, db } from './firebase-config';

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

const docExists = async (path) => {
  const docSnap = await getDoc(doc(db, path));
  return docSnap.exists();
}

// save user's data when first logged in
const saveUserData = async () => {
  if (!userIsloggedIn()) {
    return;
  }

  const user = getUser();
  const path = `users/${user.uid}`;

  if (docExists(path)) {
    return;
  }

  await setDoc(doc(db, path), {
    userName: user.displayName,
    fullName: user.displayName,
    photoURL: user.photoURL
  });
}

const userNameExist = (name) => {

}



export { userIsloggedIn, getUser, googleSignIn, signOutUser, saveUserData };
