import User from '../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserData, unfollow, follow } from '../../firebase/firestore';
import { getUid } from '../../firebase/authentication';

const Following = ({ uid, setDisplay }) => {
  const [userData, setUserData] = useState(null);
  const [followState, setFollowState] = useState(true);

  const fetchUserData = async () => {
    setUserData(await getUserData(uid));
  }

  const hideUserList = () => {
    setDisplay(false);
  }

  const handleFollow = async () => {
    await follow(getUid(), uid);
    setFollowState(true);
  }

  const unfollowUser = async () => {
    await unfollow(getUid(), uid);
    setFollowState(false);
  }

  useEffect(() => {
    if (!followState) {
      return;
    }
    fetchUserData();
  }, []);



  return (
    <div className="following">
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
          followState ? <button className='unfollowButton' onClick={unfollowUser}>Following</button>
            : <button className='followButton' onClick={handleFollow}>Follow</button>
          : ''
      }

    </div>
  )
}

export default Following;