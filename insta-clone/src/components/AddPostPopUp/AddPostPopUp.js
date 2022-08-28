import Cross from '../../assets/icons/cross.svg';
import { useState } from 'react';
import UploadImage from './UploadImage';
import AddCaption from './AddCaption';
import DiscardPostPopUp from './DiscardPostPopUp';
import PopUpHeader from './PopUpHeader';
import '../../styles/AddPostPopUp.css';

const AddPostPopUp = ({ index, iconIndex, setIconIndex }) => {
  const [imageSrc, setImageSrc] = useState('#');
  const [displayDiscard, setDisplayDiscard] = useState(false);
  const handleClickBg = () => {
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
        setImageSrc={setImageSrc} />
      <div id='addPostPopUp' style={{ display: index === iconIndex ? 'block' : 'none' }}>
        {/* <h4 id='createPostText'>Create new post</h4>
        <div className='fullLine'></div> */}
        <PopUpHeader imageSrc={imageSrc} setDisplayDiscard={setDisplayDiscard} />
        {
          imageSrc === '#' ? <UploadImage setImageSrc={setImageSrc} />
            : <AddCaption imageSrc={imageSrc} />
        }
      </div>
    </>
  );
}

export default AddPostPopUp;