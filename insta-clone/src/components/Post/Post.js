import PostHeader from "./PostHeader";
import { getUserData, userLikedPost } from '../../firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import LikePostIcon from "./LikePostIcon";
import CommentIcon from "./CommentIcon";
import SaveIcon from "./SaveIcon";
import PostText from "./PostText";
import CommentInput from "./CommentInput";
import PostMorePopUp from "../PostMorePopUp/PostMorePopUp";
import { getUid } from "../../firebase/authentication";

const Post = ({ data }) => {
  const [postOwner, setPostOwner] = useState(null);
  // to decrease fetch time, calculate like count in front end
  const [curLikeCount, setCurLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const commentInputRef = useRef(null);
  const [displayPopUp, setDisplayPopUp] = useState(false);

  const getLikeCountText = () => {
    switch (curLikeCount) {
      case 0:
        return '';
      case 1:
        return '1 like';
      default:
        return `${curLikeCount} likes`;
    }
  }

  const setLikeState = async () => {
    const hasLiked = await userLikedPost(getUid(), data.postId);
    setLiked(hasLiked);
  }

  const fetchOwner = async () => {
    setPostOwner(await getUserData(data.uid));
  }

  useEffect(() => {
    fetchOwner();
    setLikeState();
    setCurLikeCount(data.likeCount);
  }, []);

  return (
    <div className="post box">
      <PostMorePopUp display={displayPopUp} setDisplayPopUp={setDisplayPopUp} data={data} />
      <PostHeader postOwner={postOwner} setDisplayPopUp={setDisplayPopUp} />
      <img className='postImage' src={data.photoURL} alt='post' />
      <div className="iconBar">
        <LikePostIcon data={data} liked={liked} setLiked={setLiked}
          curLikeCount={curLikeCount} setCurLikeCount={setCurLikeCount} />
        <CommentIcon commentInputRef={commentInputRef} />
        <SaveIcon data={data} />
      </div>
      <p className='likeCount'>{getLikeCountText()}</p>
      <PostText postOwner={postOwner} text={data.text} data={data} />
      <div className='fullLine'></div>
      <CommentInput data={data} commentInputRef={commentInputRef} />
    </div>
  )
}

export default Post;