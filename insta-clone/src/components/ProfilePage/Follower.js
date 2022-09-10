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

  const fetchFollowState = async () => {
    setIsfollowed(await isFollowing(uid, getUid()));
  }

  const hideUserList = () => {
    setDisplay(false);
  }

  const removeFollower = async () => {
    await unfollow(uid, getUid());
  }

  useEffect(() => {
    fetchUserData();
    fetchFollowState();
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
        isFollowed ? <button className='removeButton' onClick={removeFollower}>Remove</button>
          : <button className='removedButton' disabled>Removed</button>
      }
    </div>
  )
}

export default Follower;