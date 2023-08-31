import { addDoc, collection, serverTimestamp, updateDoc, getDoc, doc, setDoc, getDocs, deleteDoc }
  from 'firebase/firestore';
import { db } from './firebase-config';
import { getUser, userIsLoggedIn } from './authentication';
import { saveImage, deleteImage, fileExist } from './storage';
import { getUid } from './authentication';
import { saveCommentEvent, saveLikePostEvent, saveFollowEvent, deleteCommentEvent, deleteLikePostEvent, deleteFollowEvent, getAllEvents, sortEvents } from './event';

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
      likeCount: 0,
      saverUidCollection: []
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
  const myUid = 'rkuWFQtMheVyu2VEVRd65a2BTat1'

  if (await docExists(path)) {
    return;
  }

  await setDoc(doc(db, path), {
    uid: user.uid,
    userName: user.displayName.replace(' ', '_'),
    fullName: user.displayName.replace(' ', '_'),
    photoURL: user.photoURL
  });

  // Follow user when they first sign in
  await follow(myUid, user.uid);
}

const userNameExist = async (name) => {
  const users = await getDocs(collection(db, 'users'));
  return (users.docs.some(user => user.data().userName === name))
}

const getUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, `users/${uid}`));
  return docSnap.data();
}

const getAllPosts = async () => {
  const postsSnap = await getDocs(collection(db, 'posts'));
  return postsSnap.docs.filter(doc => doc.data().photoURL !== '#');
}

const getPostData = async (postId) => {
  const docRef = await getDoc(doc(db, `posts/${postId}`));
  return docRef.data();
}

// NOTE finish save event in this function
const likePost = async (uid, postId) => {
  const docRef = await saveLikePostEvent(uid, postId);

  await setDoc(doc(db, `users/${uid}/likedPosts/${postId}`), {
    postId: postId,
    eventId: docRef ? docRef.id : 'none'
  });

  const curLikeCount = (await getPostData(postId)).likeCount;
  await updateDoc(doc(db, `posts/${postId}`), {
    likeCount: curLikeCount + 1
  });
}

// NOTE finish delete event in this function
const unlikePost = async (uid, postId) => {
  // delete event
  const likeDoc = await getDoc(doc(db, `users/${uid}/likedPosts/${postId}`));
  const eventId = likeDoc.data().eventId;
  await deleteLikePostEvent(postId, eventId);

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
  const postOwnerUid = (await getPostData(postId)).uid;

  const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
    uid: uid,
    postOwnerUid: postOwnerUid,
    text: text,
    timestamp: serverTimestamp()
  });

  const eventDocRef = await saveCommentEvent(uid, postId, text);

  await updateDoc(docRef, {
    id: docRef.id,
    eventId: eventDocRef ? eventDocRef.id : 'none'
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

  const oldCollection = (await getPostData(postId)).saverUidCollection;

  await updateDoc(doc(db, `posts/${postId}`), {
    saverUidCollection: oldCollection.concat(uid)
  });
}

const unsavePost = async (uid, postId) => {
  await deleteDoc(doc(db, `users/${uid}/savedPosts/${postId}`));

  const oldCollection = (await getPostData(postId)).saverUidCollection;

  await updateDoc(doc(db, `posts/${postId}`), {
    saverUidCollection: oldCollection.filter(id => id !== uid)
  });

}

const postIsSaved = async (uid, postId) => {
  return (await docExists(`users/${uid}/savedPosts/${postId}`));
}

const deletePost = async (postId) => {
  const postData = await getPostData(postId);
  const uid = postData.uid;
  const comments = (await getDocs(collection(db, `posts/${postId}/comments`))).docs;
  const saverUidCollection = postData.saverUidCollection;

  await deleteDoc(doc(db, `users/${uid}/posts/${postId}`));
  await deleteDoc(doc(db, `posts/${postId}`));
  await deleteImage(`posts/${uid}/${postId}`);

  // NOTE await don't work in foreach loop
  for (let comment of comments) {
    await deleteComment(postId, comment.data().id);
  }

  // make all users unsave this post
  for (let id of saverUidCollection) {
    unsavePost(id, postId);
  }
}

const editPostText = async (postId, text) => {
  await updateDoc(doc(db, `posts/${postId}`), {
    text: text
  });
}

const deleteComment = async (postId, commentId) => {
  const commentDocRef = await getDoc(doc(db, `posts/${postId}/comments/${commentId}`));
  await deleteCommentEvent(commentDocRef.data().postOwnerUid, commentDocRef.data().eventId);

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
  return postsSnap.docs;
}

const getSavedPosts = async (uid) => {
  const savedPosts = (await getDocs(collection(db, `users/${uid}/savedPosts`))).docs;
  return savedPosts;
}

const follow = async (followerUid, followedUid) => {
  await setDoc(doc(db, `users/${followedUid}/followers/${followerUid}`), {
    uid: followerUid
  });

  const eventDocRef = await saveFollowEvent(followerUid, followedUid);

  await setDoc(doc(db, `users/${followerUid}/following/${followedUid}`), {
    uid: followedUid,
    eventId: eventDocRef.id
  });
}

const unfollow = async (followerUid, followedUid) => {
  const followingDocRef = await getDoc(doc(db, `users/${followerUid}/following/${followedUid}`))
  const eventId = followingDocRef.data().eventId;

  await deleteFollowEvent(followedUid, eventId);
  await deleteDoc(doc(db, `users/${followedUid}/followers/${followerUid}`));
  await deleteDoc(doc(db, `users/${followerUid}/following/${followedUid}`));
}

const getFollowers = async (uid) => {
  const followersSnap = await getDocs(collection(db, `users/${uid}/followers`));
  return followersSnap.docs;
}

const getFollowings = async (uid) => {
  const followingSnap = await getDocs(collection(db, `users/${uid}/following`));
  return followingSnap.docs;
}

const isFollowing = async (followerUid, followedUid) => {
  return await docExists(`users/${followerUid}/following/${followedUid}`);
}

export {
  savePostData, docExists, saveUserData, userNameExist, getUserData, getAllPosts, likePost,
  unlikePost, userLikedPost, saveComment, getComments, savePost, unsavePost, postIsSaved,
  deletePost, editPostText, deleteComment, updateProfile, updateProfilePicture, getUserPosts,
  getPostData, getSavedPosts, follow, unfollow, getFollowers, getFollowings, isFollowing,
};