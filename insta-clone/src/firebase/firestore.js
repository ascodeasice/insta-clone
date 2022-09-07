import { addDoc, collection, serverTimestamp, updateDoc, getDoc, doc, setDoc, getDocs, deleteDoc }
  from 'firebase/firestore';
import { db } from './firebase-config';
import { getUser, userIsLoggedIn } from './authentication';
import { saveImage, deleteImage, fileExist } from './storage';
import { getUid } from './authentication';

// NOTE only for new posts
const savePostData = async (file, text) => {
  if (!userIsLoggedIn()) {
    return;
  }

  try {
    //  add a message with a loading icon that will get updated with the shared image.
    const docRef = await addDoc(collection(db, 'posts'), {
      uid: getUser().uid,
      photoURL: '#',
      text: text,
      timestamp: serverTimestamp(),
      likeCount: 0
    });

    await saveImage(file, docRef, `posts/${getUser().uid}/${docRef.id}`);

    updateDoc(docRef, {
      postId: docRef.id
    });

    await setDoc(doc(db, `users/${getUser().uid}/posts/${docRef.id}`), {
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
  if (!userIsLoggedIn()) {
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
  return postsSnap.docs.filter(doc => doc.data().photoURL !== '#');
}

const getPostData = async (postId) => {
  const docRef = await getDoc(doc(db, `posts/${postId}`));
  return docRef.data();
}

const likePost = async (uid, postId) => {
  await setDoc(doc(db, `users/${uid}/likedPosts/${postId}`), {
    postId: postId
  });

  const curLikeCount = (await getPostData(postId)).likeCount;
  await updateDoc(doc(db, `posts/${postId}`), {
    likeCount: curLikeCount + 1
  });
}

const unlikePost = async (uid, postId) => {
  await deleteDoc(doc(db, `users/${uid}/likedPosts/${postId}`));

  const curLikeCount = (await getPostData(postId)).likeCount;
  await updateDoc(doc(db, `posts/${postId}`), {
    likeCount: curLikeCount - 1
  });
}

const userLikedPost = async (uid, postId) => {
  const docRef = await getDocs(collection(db, `users/${uid}/likedPosts`));
  const likedPost = docRef.docs.map(doc => doc.data());
  return likedPost.some(post => post.postId === postId);
}

const saveComment = async (uid, postId, text) => {
  const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
    uid: uid,
    text: text,
    timestamp: serverTimestamp()
  });
  await updateDoc(docRef, {
    id: docRef.id
  });
}

const getComments = async (postId) => {
  const commentsSnapShot = await getDocs(collection(db, `posts/${postId}/comments`));
  return commentsSnapShot.docs.filter(doc => doc.data().text); // make sure text exists
}

const savePost = async (uid, postId) => {
  await setDoc(doc(db, `users/${uid}/savedPosts/${postId}`), {
    postId: postId
  });
}

const unsavePost = async (uid, postId) => {
  await deleteDoc(doc(db, `users/${uid}/savedPosts/${postId}`));
}

const postIsSaved = async (uid, postId) => {
  return (await docExists(`users/${uid}/savedPosts/${postId}`));
}

const deletePost = async (postId) => {
  const postData = await getPostData(postId);
  const uid = postData.uid;
  const comments = (await getDocs(collection(db, `posts/${postId}/comments`))).docs;

  await deleteDoc(doc(db, `users/${uid}/posts/${postId}`));
  await deleteDoc(doc(db, `posts/${postId}`));
  await deleteImage(`posts/${uid}/${postId}`);
  for (let comment of comments) {
    await deleteComment(postId, comment.data().id);
  }
}

const editPostText = async (postId, text) => {
  await updateDoc(doc(db, `posts/${postId}`), {
    text: text
  });
}

const deleteComment = async (postId, commentId) => {
  await deleteDoc(doc(db, `posts/${postId}/comments/${commentId}`));
}

// NOTE update profilePicture?

const updateProfilePicture = async (file) => {
  const docRef = doc(db, `users/${getUid()}`);
  if (await fileExist(`profilePictures/${getUid()}`)) {
    // delete old profile picture
    await deleteImage(`profilePictures/${getUid()}`);
  }
  // upload new profile picture
  await saveImage(file, docRef, `profilePictures/${getUid()}`);
}

const updateProfile = async (userName, fullName, bio) => {
  await updateDoc(doc(db, `users/${getUid()}`), {
    userName: userName,
    fullName: fullName,
    bio: bio,
  });
}

const getUserPosts = async (uid) => {
  const postsSnap = await getDocs(collection(db, `users/${uid}/posts`));
  return (
    postsSnap.docs
      .filter(doc => doc.data().photoURL !== '#')
  );
}

export {
  savePostData, docExists, saveUserData, userNameExist, getUserData, getPosts, likePost,
  unlikePost, userLikedPost, saveComment, getComments, savePost, unsavePost, postIsSaved,
  deletePost, editPostText, deleteComment, updateProfile, updateProfilePicture, getUserPosts,
  getPostData
};