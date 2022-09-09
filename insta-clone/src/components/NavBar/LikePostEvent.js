import { useState, useEffect } from "react";
import { getUserData, getPostData } from "../../firebase/firestore";
import { Link } from 'react-router-dom';
import User from '../../assets/icons/user.svg';
import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import { shortenTimeStr } from "../../functions/format";

// maybe use this with comment event
const LikePostEvent = ({ event }) => {
  const [userName, setUserName] = useState('loading...');
  const [profilePhotoURL, setProfilePhotoURL] = useState('#');
  const [postPhotoURL, setPostPhotoURL] = useState('#');

  const fetchData = async () => {
    const userData = await getUserData(event.data().uid);
    const postData = await getPostData(event.data().postId);
    setUserName(userData.userName);
    setProfilePhotoURL(userData.photoURL);
    setPostPhotoURL(postData.photoURL);
  }

  const getPastTime = () => {
    const date = fromUnixTime(event.data().timestamp.seconds);
    const timeStr = formatDistanceToNowStrict(date);
    return shortenTimeStr(timeStr);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="likePostEvent">
      <Link to={`/profile/${event.data().uid}`}>
        <img className='profilePicture' src={profilePhotoURL || User} alt='user' />
      </Link>
      <Link className="userName" to={`/profile/${event.data().uid}`}>
        {userName}
      </Link>
      <p>liked your photo</p>
      <p className="time">{getPastTime()}</p>
      {
        postPhotoURL === '#' ? <p>Loading...</p>
          : <Link to={`/post/${event.data().postId}`}>
            <img src={postPhotoURL} alt='post' className='postImage' />
          </Link>
      }
    </div>
  )
}

export default LikePostEvent