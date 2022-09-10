import { useState, useEffect } from "react";
import { getUserData, getPostData } from "../../firebase/firestore";
import { Link } from 'react-router-dom';
import User from '../../assets/icons/user.svg';
import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import { shortenTimeStr } from "../../functions/format";

// maybe use this with comment event
const Event = ({ event }) => {
  const [userName, setUserName] = useState('loading...');
  const [profilePhotoURL, setProfilePhotoURL] = useState('#');
  const [postPhotoURL, setPostPhotoURL] = useState('#');

  const fetchData = async () => {
    const userData = await getUserData(event.data().uid);
    const postData = await getPostData(event.data().postId);
    setUserName(userData.userName);
    setProfilePhotoURL(userData.photoURL);
    if (postData) {
      setPostPhotoURL(postData.photoURL);
    }
  }

  const getPastTime = () => {
    const date = fromUnixTime(event.data().timestamp.seconds);
    const timeStr = formatDistanceToNowStrict(date);
    return shortenTimeStr(timeStr);
  }

  useEffect(() => {
    fetchData();
  }, []);

  switch (event.data().type) {
    case 'like':
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
    case 'follow':
      return (
        <div className="likePostEvent">
          <Link to={`/profile/${event.data().uid}`}>
            <img className='profilePicture' src={profilePhotoURL || User} alt='user' />
          </Link>
          <Link className="userName" to={`/profile/${event.data().uid}`}>
            {userName}
          </Link>
          <p>started following you</p>
          <p className="time">{getPastTime()}</p>
        </div>
      )
    case 'comment':
      return (
        <div className="likePostEvent">
          <Link to={`/profile/${event.data().uid}`}>
            <img className='profilePicture' src={profilePhotoURL || User} alt='user' />
          </Link>
          <Link className="userName" to={`/profile/${event.data().uid}`}>
            {userName}
          </Link>
          <p>{`commented:${event.data().text}`}</p>
          <p className="time">{getPastTime()}</p>
          {
            postPhotoURL === '#' ? <p>Loading...</p>
              : <Link to={`/post/${event.data().postId}`}>
                <img src={postPhotoURL} alt='post' className='postImage' />
              </Link>
          }
        </div>

      )
    default:
      return '';
  }
}

export default Event