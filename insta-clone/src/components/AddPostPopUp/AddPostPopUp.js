import Cross from '../../assets/icons/cross.svg';
import { useState } from 'react';
import UploadImage from './UploadImage';
import AddCaption from './AddCaption';
import DiscardPostPopUp from './DiscardPostPopUp';
import PopUpHeader from './PopUpHeader';
import Posting from './Posting';
import '../../styles/AddPostPopUp.css';
import { useEffect } from 'react';
import { useDoneSharing } from '../contexts/DoneSharingContext';

const AddPostPopUp = ({ index, iconIndex, setIconIndex }) => {
  const [imageSrc, setImageSrc] = useState('#');
  const [imageFile, setImageFile] = useState(null);
  const [displayDiscard, setDisplayDiscard] = useState(false);
  const [shared, setShared] = useState(false);
  const [postText, setPostText] = useState('');
  const { doneSharing, setDoneSharing } = useDoneSharing();

  const getDefaultIconIndex = () => {
    if (window.location.pathname.includes('profile')) {
      return 3;
    } else {
      return 0;
    }
  }

  const handleClickBg = () => {
    if (imageSrc !== '#' && shared && !doneSharing) {
      //don't do anything when sharing posts
      return;
    }
    setShared(false);
    if (imageSrc === '#' || doneSharing) {
      setIconIndex(getDefaultIconIndex());
    } else {
      setDisplayDiscard(true);
    }
  }

  const resetStates = () => {
    setImageSrc('#');
    setImageFile(null);
    setDisplayDiscard(false);
    setShared(false);
    setPostText('');
    setDoneSharing(false);
  }

  // component is just invisible, not unmounted, so need to reset states
  useEffect(() => {
    resetStates();
  }, [iconIndex])

  return (
    <>
      <div className='darkBg' style={{ display: index === iconIndex ? 'block' : 'none' }} onClick={handleClickBg}>
        <img className='cancelIcon' src={Cross} alt='cancel' onClick={handleClickBg} />
      </div>
      <DiscardPostPopUp displayDiscard={displayDiscard} setDisplayDiscard={setDisplayDiscard}
        setImageSrc={setImageSrc} setImageFile={setImageFile} />
      <div id='addPostPopUp' style={{ display: index === iconIndex ? 'block' : 'none' }}>
        <PopUpHeader imageFile={imageFile} setDisplayDiscard={setDisplayDiscard}
          setShared={setShared} postText={postText} setDone={setDoneSharing} done={doneSharing} />
        {
          imageSrc === '#' ? <UploadImage setImageSrc={setImageSrc} setImageFile={setImageFile} />
            : shared ? <Posting done={doneSharing} />
              : <AddCaption imageSrc={imageSrc} setPostText={setPostText} imageFile={imageFile} />
        }
      </div>
    </>
  );
}

export default AddPostPopUp;