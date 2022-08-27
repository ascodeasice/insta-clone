import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc, getDocs, collection } from 'firebase/firestore';
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

  if (await docExists(path)) {
    return;
  }

  await setDoc(doc(db, path), {
    uid: user.uid,
    userName: user.displayName,
    fullName: user.displayName,
    photoURL: user.photoURL
  });
}

const userNameExist = async (name) => {
  const users = await getDocs(collection(db, 'users'));
  return (users.docs.some(user => user.data().userName === name))
}

const getUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, `users/${uid}`));
  return docSnap.data();
}


export { userIsloggedIn, getUser, googleSignIn, signOutUser, saveUserData, userNameExist, getUserData };
