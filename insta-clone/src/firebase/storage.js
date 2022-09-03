import { updateDoc } from 'firebase/firestore';
import { storage } from './firebase-config';
import { uploadBytesResumable, getDownloadURL, ref, deleteObject } from 'firebase/storage'

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

const deleteImage = async (uid, postId) => {
  const imageRef = ref(storage, `posts/${uid}/${postId}`);
  await deleteObject(imageRef);
}

export { saveImage, deleteImage };