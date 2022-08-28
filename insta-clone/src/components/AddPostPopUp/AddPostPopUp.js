import Cross from '../../assets/icons/cross.svg';
import { useState } from 'react';
import UploadImage from './UploadImage';
import AddCaption from './AddCaption';
import DiscardPostPopUp from './DiscardPostPopUp';
import PopUpHeader from './PopUpHeader';
import Posting from './Posting';
import '../../styles/AddPostPopUp.css';

const AddPostPopUp = ({ index, iconIndex, setIconIndex }) => {
  const [imageSrc, setImageSrc] = useState('#');
  const [imageFile, setImageFile] = useState(null);
  const [displayDiscard, setDisplayDiscard] = useState(false);
  const [shared, setShared] = useState(false);
  const [postText, setPostText] = useState('');
  const handleClickBg = () => {
    setShared(false);
    if (imageSrc === '#') {
      setIconIndex(0);
    } else {
      setDisplayDiscard(true);
    }
  }

  return (
    <>
      <div className='darkBg' style={{ display: index === iconIndex ? 'block' : 'none' }} onClick={handleClickBg}>
        <img className='cancelIcon' src={Cross} alt='cancel' onClick={handleClickBg} />
      </div>
      <DiscardPostPopUp displayDiscard={displayDiscard} setDisplayDiscard={setDisplayDiscard}
        setImageSrc={setImageSrc} setImageFile={setImageFile} />
      <div id='addPostPopUp' style={{ display: index === iconIndex ? 'block' : 'none' }}>
        <PopUpHeader imageFile={imageFile} setDisplayDiscard={setDisplayDiscard}
          setShared={setShared} postText={postText} />
        {
          imageSrc === '#' ? <UploadImage setImageSrc={setImageSrc} setImageFile={setImageFile} />
            : shared ? <Posting />
              : <AddCaption imageSrc={imageSrc} setPostText={setPostText} imageFile={imageFile} />
        }
      </div>
    </>
  );
}

export default AddPostPopUp;