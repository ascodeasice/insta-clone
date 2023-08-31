import BackIcon from '../../assets/icons/back.svg';
import { savePostData } from '../../firebase/firestore';

const PopUpHeader = ({ setDisplayDiscard, setShared, postText, imageFile, setDone, done }) => {
  const goBack = () => {
    setDisplayDiscard(true);
  }

  const share = async () => {
    setShared(true);
    await savePostData(imageFile, postText);
    setDone(true);
  }

  if (imageFile === null) {
    return (
      <>
        <h4 id='createPostText'>Create new post</h4>
        <div className='fullLine'></div>
      </>
    )
  } else if (!done) {
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
  } else {
    return (
      <>
        <h4 id='createPostText'>Post Shared</h4>
        <div className='fullLine'></div>
      </>
    )
  }
}

export default PopUpHeader;
