import User from '../../assets/icons/user.svg';
import { useState, useEffect } from 'react';
import { getPosts } from '../../firebase/firestore';
import { Link } from 'react-router-dom';

const Info = ({ userData }) => {
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const fetchData = async () => {
    const posts = await getPosts(userData.uid);
    setPostCount(posts.length);
    // TODO get followers, get followings
  }

  useEffect(() => {
    if (userData === null) {
      return;
    }
    fetchData();
  }, [userData]);

  return (
    <div id='info'>
      <img id='userPhoto' src={userData ? userData.photoURL : User} alt='user' />
      <p id='userName'>{userData ? userData.userName : 'loading...'}</p>
      <Link to='/account/edit'><button id='editProfileButton'>Edit Profile</button></Link>
      <div id='infoContainer'>
        <p><strong>{postCount} </strong>posts</p>
        <p><strong>{followerCount} </strong>followers</p>
        <p><strong>{followingCount} </strong>following</p>
      </div>
      <p id='fullName'>{userData ? userData.fullName : 'loading...'}</p>
      <p id='bio'>TODO: get bio</p>
    </div>
  )
}

export default Info;