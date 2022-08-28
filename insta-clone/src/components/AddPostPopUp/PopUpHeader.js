import BackIcon from '../../assets/icons/back.svg';
import { savePostData } from '../../firebase/post';

const PopUpHeader = ({ setDisplayDiscard, setShared, postText, imageFile }) => {
  const goBack = () => {
    setDisplayDiscard(true);
  }

  const share = () => {
    setShared(true);
    savePostData(imageFile, postText);
  }

  if (imageFile === null) {
    return (
      <>
        <h4 id='createPostText'>Create new post</h4>
        <div className='fullLine'></div>
      </>
    )
  } else {
    return (
      <>
        <div id='popUpHeader'>
          <img id='backIcon' src={BackIcon} alt='back' onClick={goBack} />
          <h4 id='createPostText'>Create new post</h4>
          <p id='shareText' onClick={share}>Share</p>
        </div>
        <div className='fullLine'></div>
      </>
    )
  }
}

export default PopUpHeader;
