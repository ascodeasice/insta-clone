import BookMark from '../../assets/icons/bookmark.svg';
import BlackBookMark from '../../assets/icons/blackBookMark.svg';
import { savePost, unsavePost, postIsSaved } from '../../firebase/firestore';
import { useState, useEffect } from 'react';
import { getUid } from '../../firebase/authentication';

const SaveIcon = ({ data }) => {
  const [saved, setSaved] = useState(false);

  const handleClick = async () => {
    if (saved) {
      setSaved(false);
      await unsavePost(getUid(), data.postId);
    } else {
      setSaved(true);
      await savePost(getUid(), data.postId);
    }
  }

  const getSrc = () => {
    return saved ? BlackBookMark : BookMark;
  }

  const fetchSavedState = async () => {
    setSaved(await postIsSaved(getUid(), data.postId));
  }

  useEffect(() => {
    fetchSavedState();
  }, []);

  return <img className='saveIcon' src={getSrc()} alt='save' onClick={handleClick} />
}

export default SaveIcon;