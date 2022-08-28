import BackIcon from '../../assets/icons/back.svg';

const PopUpHeader = ({ imageSrc, setDisplayDiscard }) => {
  const goBack = () => {
    setDisplayDiscard(true);
  }

  const post = () => {
    console.log('posted');
    // TODO save post info to firestore
  }

  if (imageSrc === '#') {
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
          <p id='shareText' onClick={post}>Share</p>
        </div>
        <div className='fullLine'></div>
      </>
    )
  }
}

export default PopUpHeader;
