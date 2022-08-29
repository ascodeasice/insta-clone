import { addDoc, collection, serverTimestamp, updateDoc, getDoc, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import { getUser, userIsloggedIn } from './authentication';
import { saveImage } from './storage';

const savePostData = async (file, text) => {
  if (!userIsloggedIn()) {
    return;
  }

  try {
    //  add a message with a loading icon that will get updated with the shared image.
    const docRef = await addDoc(collection(db, 'posts'), {
      uid: getUser().uid,
      photoURL: '#',
      text: text,
      timestamp: serverTimestamp()
    });

    await saveImage(file, docRef, `posts/${getUser().uid}/${docRef.id}`);

    updateDoc(docRef, {
      postId: docRef.id
    });

    addDoc(collection(db, `users/${getUser().uid}/posts`), {
      postId: docRef.id
    })

  } catch (error) {
    console.error('There was an error storing post(cloud storage):', error);
  }
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

const getPosts = async () => {
  const postsSnap = await getDocs(collection(db, 'posts'));
  return postsSnap.docs;
}

export { savePostData, docExists, saveUserData, userNameExist, getUserData, getPosts };