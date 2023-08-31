import User from '../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserData, isFollowing, unfollow } from '../../firebase/firestore';
import { getUid } from '../../firebase/authentication';

const Follower = ({ uid, setDisplay }) => {
  const [userData, setUserData] = useState(null);
  const [isFollowed, setIsfollowed] = useState(true);

  const fetchUserData = async () => {
    setUserData(await getUserData(uid));
  }

  const hideUserList = () => {
    setDisplay(false);
  }

  const removeFollower = async () => {
    await unfollow(uid, getUid());
    setIsfollowed(false);
  }

  useEffect(() => {
    if (!isFollowed) {
      return;
    }
    fetchUserData();
  }, []);

  return (
    <div className='follower'>
      <Link to={`/profile/${uid}`} onClick={hideUserList}>
        <img className='profilePicture' src={userData ? userData.photoURL : User} alt='user' />
      </Link>
      <div className="nameWrapper">
        <Link to={`/profile/${uid}`} onClick={hideUserList}>
          <p className='userName'>{userData ? userData.userName : 'Loading...'}</p>
        </Link>
        <p className='fullName grey'>{userData ? userData.fullName : 'Loading...'}</p>
      </div>
      {
        // is user's profile
        window.location.pathname.includes(getUid()) ?
          isFollowed ? <button className='removeButton' onClick={removeFollower}>Remove</button>
            : <button className='removedButton' disabled>Removed</button>
          : ''
      }
    </div>
  )
}

export default Follower;