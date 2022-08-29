import Cross from '../../assets/icons/cross.svg';
import { useState } from 'react';
import UploadImage from './UploadImage';
import AddCaption from './AddCaption';
import DiscardPostPopUp from './DiscardPostPopUp';
import PopUpHeader from './PopUpHeader';
import Posting from './Posting';
import '../../styles/AddPostPopUp.css';
import { useEffect } from 'react';

const AddPostPopUp = ({ index, iconIndex, setIconIndex }) => {
  const [imageSrc, setImageSrc] = useState('#');
  const [imageFile, setImageFile] = useState(null);
  const [displayDiscard, setDisplayDiscard] = useState(false);
  const [shared, setShared] = useState(false);
  const [postText, setPostText] = useState('');
  const [done, setDone] = useState(false);

  const handleClickBg = () => {
    setShared(false);
    if (imageSrc === '#' || done) {
      setIconIndex(0);
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
    setDone(false);
  }

  // just invisible, not unmounted
  // So need to reset states
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
          setShared={setShared} postText={postText} setDone={setDone} done={done} />
        {
          imageSrc === '#' ? <UploadImage setImageSrc={setImageSrc} setImageFile={setImageFile} />
            : shared ? <Posting done={done} />
              : <AddCaption imageSrc={imageSrc} setPostText={setPostText} imageFile={imageFile} />
        }
      </div>
    </>
  );
}

export default AddPostPopUp;