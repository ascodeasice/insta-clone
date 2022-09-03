import More from '../../assets/icons/more.svg';
import User from '../../assets/icons/user.svg';

const PostHeader = ({ postOwner, setDisplayPopUp }) => {
  const showPopUp = () => {
    setDisplayPopUp(true);
  }

  return (
    <>
      <div className='postHeader'>
        <img className='postProfilePicture' src={postOwner ? postOwner.photoURL : User} alt='user' />
        <p className='postUserName'>{postOwner ? postOwner.userName : 'loading'}</p>
        <img className='moreIcon' src={More} alt='more' onClick={showPopUp} />
      </div>
      <div className="fullLine">  </div>
    </>
  )
}

export default PostHeader;