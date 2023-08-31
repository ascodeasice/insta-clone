import { deletePost, isFollowing, getPostData, follow, unfollow } from "../../firebase/firestore";
import { getUid } from "../../firebase/authentication";
import { useDeletePost } from "../contexts/DeletePostContext";
import { useState, useEffect } from "react";
import EditPostPopUp from "../EditPostPopUp/EditPostPopUp";
import { Link } from 'react-router-dom';

const PostMorePopUp = ({ display, setDisplayPopUp, data }) => {
  const { setDeletePost } = useDeletePost();
  const [displayEditPopUp, setDisplayEditPopUp] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);

  const cancelPopUp = () => {
    setDisplayPopUp(false);
  }

  const handleDelete = async () => {
    await deletePost(data.postId);
    setDeletePost(true);
    cancelPopUp();
  }

  const editPost = () => {
    setDisplayPopUp(false);
    setDisplayEditPopUp(true);
  }

  const fetchFollowState = async () => {
    setHasFollowed(await isFollowing(getUid(), data.uid));
  }

  const handleFollow = async () => {
    setDisplayPopUp(false);
    setHasFollowed(true);
    await follow(getUid(), data.uid);
  }

  const handleUnfollow = async () => {
    setDisplayPopUp(false);
    setHasFollowed(false);
    await unfollow(getUid(), data.uid);
  }

  useEffect(() => {
    fetchFollowState()
  }, []);

  return (
    <>
      <div className='darkBg' style={{ display: display ? 'block' : 'none' }} onClick={cancelPopUp}></div>
      <div id="postMorePopUp" className='popUpMenu' style={{ display: display ? 'block' : 'none' }}>
        {
          // not user's post
          data.uid !== getUid() ? <>
            {
              hasFollowed ? <p className='redText' onClick={handleUnfollow}>Unfollow</p>
                : <p onClick={handleFollow}>Follow</p>
            }
            <div className='fullLine'></div>
          </>
            : ''
        }
        {
          data.uid === getUid() ? <>
            <p className="redText" onClick={handleDelete}>Delete</p>
            <div className='fullLine'></div>
            <p onClick={editPost}>Edit</p>
            <div className='fullLine'></div>
          </>
            : ''
        }
        {
          // don't render if in post page
          window.location.pathname.includes('post') ? ''
            : <>
              <p><Link className="black" to={`/post/${data.postId}`}>Go to post</Link></p>
              <div className="fullLine"></div>
            </>
        }
        <p onClick={cancelPopUp}>Cancel</p>
      </div>
      <EditPostPopUp imageSrc={data.photoURL} originText={data.text} displayEditPopUp={displayEditPopUp}
        setDisplay={setDisplayEditPopUp} data={data} />
    </>
  );
}

export default PostMorePopUp;