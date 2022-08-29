import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebase-config';
import { getUser, userIsloggedIn } from './authentication';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage'

const saveImage = async (file, docRef, storagePath) => {
  // Upload the image to Cloud Storage.
  const newImageRef = ref(storage, storagePath);
  const fileSnapshot = await uploadBytesResumable(newImageRef, file);

  // Generate a public URL for the file.
  const publicImageUrl = await getDownloadURL(newImageRef);

  // Update the placeholder with the image's URL.
  await updateDoc(docRef, {
    photoURL: publicImageUrl,
    storageURL: fileSnapshot.metadata.fullPath
  });
}

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

export { savePostData };