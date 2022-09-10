import User from '../../assets/icons/user.svg';
import { useState, useEffect } from 'react';
import {
  getUserPosts, getFollowings, getFollowers, isFollowing,
  follow, unfollow
} from '../../firebase/firestore';
import { Link } from 'react-router-dom';
import { useDoneSharing } from '../contexts/DoneSharingContext';
import { getUid } from '../../firebase/authentication';

const Info = ({ userData }) => {
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const { doneSharing } = useDoneSharing();
  const [hasFollowed, setHasFollowed] = useState(false);

  const fetchData = async () => {
    if (userData === null) {
      return;
    }
    const posts = await getUserPosts(userData.uid);
    const followState = await isFollowing(getUid(), userData.uid);

    setPostCount(posts.length);
    setFollowerCount((await getFollowers(userData.uid)).length);
    setFollowingCount((await getFollowings(userData.uid)).length);
    setHasFollowed(followState);
  }

  const isCurrentUserProfile = () => {
    if (userData === null) {
      return false;
    } else {
      return userData.uid === getUid();
    }
  }

  const handleFollow = async () => {
    if (userData === null) {
      return;
    }
    await follow(getUid(), userData.uid);
    setHasFollowed(true);
    // change user view here to prevent re-fetching
    setFollowerCount(followerCount + 1);
  }

  const handleUnfollow = async () => {
    if (userData === null) {
      return;
    }
    await unfollow(getUid(), userData.uid);
    setHasFollowed(false);
    // change user view here to prevent re-fetching
    setFollowerCount(followerCount - 1);
  }

  useEffect(() => {
    if (userData === null && !doneSharing) {
      return;
    }
    fetchData();
  }, [userData, doneSharing]);

  return (
    <div id='info'>
      <img id='userPhoto' src={userData ? userData.photoURL : User} alt='user' />
      <p id='userName'>{userData ? userData.userName : 'loading...'}</p>
      {
        isCurrentUserProfile() ?
          <Link to='/account/edit'><button id='editProfileButton'>Edit Profile</button></Link>
          : hasFollowed ? <button className='unfollowButton' onClick={handleUnfollow}>Following</button>
            : <button className='followButton' onClick={handleFollow}>Follow</button>
      }
      <div id='infoContainer'>
        <p><strong>{postCount} </strong>posts</p>
        <p><strong>{followerCount} </strong>followers</p>
        <p><strong>{followingCount} </strong>following</p>
      </div>
      <p id='fullName'>{userData ? userData.fullName : 'loading...'}</p>
      <p id='bio'>{userData ? userData.bio || '' : 'loading...'}</p>
    </div>
  )
}

export default Info;