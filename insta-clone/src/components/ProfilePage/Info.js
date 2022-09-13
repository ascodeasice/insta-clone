import User from '../../assets/icons/user.svg';
import { useState, useEffect } from 'react';
import {
  getUserPosts, getFollowings, getFollowers, isFollowing,
  follow, unfollow
} from '../../firebase/firestore';
import { Link } from 'react-router-dom';
import { useDoneSharing } from '../contexts/DoneSharingContext';
import { getUid } from '../../firebase/authentication';
import UserList from './UserList';

const Info = ({ userData }) => {
  const [postCount, setPostCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { doneSharing } = useDoneSharing();
  const [hasFollowed, setHasFollowed] = useState(false);
  const [displayFollowing, setDisplayFollowing] = useState(false);
  const [displayFollowers, setDisplayFollowers] = useState(false);

  const fetchData = async () => {
    if (userData === null) {
      return;
    }
    const posts = await getUserPosts(userData.uid);
    const followState = await isFollowing(getUid(), userData.uid);

    setPostCount(posts.length);

    setFollowers(await getFollowers(userData.uid));
    setFollowing(await getFollowings(userData.uid));
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
  }

  const handleUnfollow = async () => {
    if (userData === null) {
      return;
    }
    await unfollow(getUid(), userData.uid);
    setHasFollowed(false);
  }

  const showFollowers = () => {
    setDisplayFollowers(true);
  }

  const showFollowing = () => {
    setDisplayFollowing(true);
  }

  useEffect(() => {
    if (userData === null && !doneSharing) {
      return;
    }
    fetchData();
  }, [userData, doneSharing, hasFollowed]);

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
        <p onClick={showFollowers} className='clickable'>
          <strong>{followers.length} </strong>follower{followers.length == 1 ? '' : 's'}
        </p>
        <p onClick={showFollowing} className='clickable'><strong>{following.length} </strong>following</p>
      </div>
      <p id='fullName'>{userData ? userData.fullName : 'loading...'}</p>
      <p id='bio'>{userData ? userData.bio || '' : 'loading...'}</p>
      <UserList users={followers} display={displayFollowers} setDisplay={setDisplayFollowers} heading='Followers' />
      <UserList users={following} display={displayFollowing} setDisplay={setDisplayFollowing} heading='Following' />
    </div>
  )
}

export default Info;