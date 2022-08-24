import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
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

const saveUserData = (userName, fullName, email, password = null) => {
  const user = getUser();
  if (user) {
    setDoc(doc(db, `users/${user.uid}`), {
      id: user.uid,
      fullName: fullName ? userName : fullName,
      userName: userName,
      email: email,
      password: password ? password : 'none'
    });
  }
}

const userNameExist = (name) => {

}



export { userIsloggedIn, getUser, googleSignIn, signOutUser, saveUserData };
