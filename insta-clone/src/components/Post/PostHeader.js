import More from '../../assets/icons/more.svg';
import User from '../../assets/icons/user.svg';
import { Link } from 'react-router-dom';

const PostHeader = ({ postOwner, setDisplayPopUp }) => {
  const showPopUp = () => {
    setDisplayPopUp(true);
  }

  const getLink = () => {
    return postOwner ? `/profile/${postOwner.uid}` : '/';
  }

  return (
    <>
      <div className='postHeader'>
        <Link to={getLink()}>
          <img className='postProfilePicture' src={postOwner ? postOwner.photoURL : User} alt='user' />
        </Link>
        <Link to={getLink()}>
          <p className='postUserName'>{postOwner ? postOwner.userName : 'loading'}</p>
        </Link>
        <img className='moreIcon' src={More} alt='more' onClick={showPopUp} />
      </div>
      <div className="fullLine">  </div>
    </>
  )
}

export default PostHeader;