import More from '../../assets/icons/more.svg';
import User from '../../assets/icons/user.svg';

const PostHeader = ({ postOwner }) => {
  return (
    <>
      <div className='postHeader'>
        <img className='postProfilePicture' src={postOwner ? postOwner.photoURL : User} alt='user' />
        <p className='postUserName'>{postOwner ? postOwner.userName : 'loading'}</p>
        <img className='moreIcon' src={More} alt='more' />
      </div>
      <div className="fullLine">  </div>
    </>
  )
}

export default PostHeader;