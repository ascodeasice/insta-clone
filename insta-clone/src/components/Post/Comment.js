import { getUserData, getPostData } from "../../firebase/firestore";
import { getUid } from "../../firebase/authentication";
import { useState, useEffect } from "react";
import More from '../../assets/icons/more.svg';
import CommentPopUp from "./CommentPopUp";
import { Link } from "react-router-dom";

const Comment = ({ uid, text, postId, commentId }) => {
  const [userData, setUserData] = useState({});
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [isPostOwner, setIsPostOwner] = useState(false);

  const fetchUserData = async () => {
    const userDataSnap = await getUserData(uid);
    setUserData(userDataSnap)
  }

  const checkPostOwner = async () => {
    const postData = await getPostData(postId);
    setIsPostOwner(getUid() === postData.uid);
  }

  const showPopUp = () => {
    setDisplayPopUp(true);
  }

  const getProfileLink = () => {
    return `/profile/${uid}`
  }

  useEffect(() => {
    fetchUserData();
    checkPostOwner();
  }, []);

  return (
    <>
      <div className="comment">

        <Link to={getProfileLink()}>
          <p className="userName">{userData ? userData.userName : 'loading'}</p>
        </Link>

        <p className='commentText'>{text}</p>
        {
          uid === getUid() || isPostOwner ? <img className="moreIcon" src={More} alt='more' onClick={showPopUp} />
            : ''
        }
      </div>
      <CommentPopUp postId={postId} commentId={commentId} display={displayPopUp} setDisplay={setDisplayPopUp} />
    </>
  );
}

export default Comment;