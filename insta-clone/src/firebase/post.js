import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebase-config';
import { getUser, userIsloggedIn } from './authentication';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage'

const savePostData = async (file, text) => {
  if (!userIsloggedIn()) {
    return;
  }

  try {
    //  add a message with a loading icon that will get updated with the shared image.
    const docRef = await addDoc(collection(db, 'posts'), {
      uid: getUser().uid,
      imageUrl: '#',
      text: text,
      timestamp: serverTimestamp()
    });

    // Upload the image to Cloud Storage.
    const filePath = `${getUser().uid}/${docRef.id}`;
    const newImageRef = ref(storage, filePath);
    const fileSnapshot = await uploadBytesResumable(newImageRef, file);

    // Generate a public URL for the file.
    const publicImageUrl = await getDownloadURL(newImageRef);

    // Update the placeholder with the image's URL.
    await updateDoc(docRef, {
      imageUrl: publicImageUrl,
      storageUrl: fileSnapshot.metadata.fullPath
    });
  } catch (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  }

}

export { savePostData };