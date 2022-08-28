import Cross from '../../assets/icons/cross.svg';
import { useState } from 'react';
import UploadImage from './UploadImage';
import AddCaption from './AddCaption';

const AddPostPopUp = ({ index, iconIndex, setIconIndex }) => {
  const [imageSrc, setImageSrc] = useState('#');
  const handleClickBg = () => {
    if (imageSrc === '#') {
      setIconIndex(0);
    } else {
      console.log('ask for sure');
    }
  }


  return (
    <>
      <div className='darkBg' style={{ display: index === iconIndex ? 'block' : 'none' }} onClick={handleClickBg}>
        <img className='cancelIcon' src={Cross} alt='cancel' onClick={handleClickBg} />
      </div>
      <div id='addPostPopUp' style={{ display: index === iconIndex ? 'block' : 'none' }}>
        <h4 id='createPostText'>Create new post</h4>
        <div className='fullLine'></div>
        {
          imageSrc === '#' ? <UploadImage setImageSrc={setImageSrc} /> : <AddCaption imageSrc={imageSrc} />
          // TODO Post page
        }
      </div>
    </>
  );
}

export default AddPostPopUp;