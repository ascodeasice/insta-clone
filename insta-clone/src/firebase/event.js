import { getPostData } from "./firestore";
import { serverTimestamp, doc, collection, addDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

const saveLikePostEvent = async (likerUid, postId) => {
  const likedUid = (await getPostData(postId)).uid;
  if (likerUid === likedUid) {
    return null;
  }

  const docRef = await addDoc(collection(db, `users/${likedUid}/events`), {
    timestamp: serverTimestamp(),
    uid: likerUid,
    postId: postId,
    type: "like"
  });

  updateDoc(docRef, {
    id: docRef.id
  });

  return docRef;
}

const deleteLikePostEvent = async (postId, eventId) => {
  const likedUid = (await getPostData(postId)).uid;

  await deleteDoc(doc(db, `users/${likedUid}/events/${eventId}`));
}

const getAllEvents = async (likedUid) => {
  const eventsSnap = await getDocs(collection(db, `users/${likedUid}/events`));
  return eventsSnap.docs;
}

const saveFollowEvent = async (followerUid, followedUid) => {
  const docRef = await addDoc(collection(db, `users/${followedUid}/events`), {
    // Not store user name, fetch name with uid in case it changes
    uid: followerUid,
    timestamp: serverTimestamp(),
    type: 'follow'
  });

  updateDoc(docRef, {
    id: docRef.id
  });

  return docRef;
}

const deleteFollowEvent = async (followedUid, eventId) => {
  await deleteDoc(doc(db, `users/${followedUid}/events/${eventId}`));
}

const sortEvents = (docs) => {
  return docs.sort((a, b) => b.data().timestamp - a.data().timestamp);
}

const saveCommentEvent = async (uid, postId, text) => {
  const postData = await getPostData(postId);
  const postOwnerUid = postData.uid;

  if (uid === postOwnerUid) {
    return null;
  }

  const docRef = await addDoc(collection(db, `users/${postOwnerUid}/events`), {
    uid: uid,
    text: text,
    type: 'comment',
    timestamp: serverTimestamp(),
    postId: postId
  });

  await updateDoc(docRef, {
    id: docRef.id,
  });
  return docRef;
}

const deleteCommentEvent = async (postOwnerUid, eventId) => {
  await deleteDoc(doc(db, `users/${postOwnerUid}/events/${eventId}`));
}

export {
  saveCommentEvent, deleteCommentEvent, deleteFollowEvent, sortEvents, getAllEvents,
  deleteLikePostEvent, saveFollowEvent, saveLikePostEvent
}