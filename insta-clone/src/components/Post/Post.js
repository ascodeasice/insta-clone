import PostHeader from "./PostHeader";
import { getUserData } from '../../firebase/firestore';
import { useEffect, useState } from 'react';
import LikePostIcon from "./LikePostIcon";
import CommentIcon from "./CommentIcon";
import SaveIcon from "./SaveIcon";
import PostText from "./PostText";
import { userLikedPost } from "../../firebase/firestore";
import CommentInput from "./CommentInput";

const Post = ({ data }) => {
  const [postOwner, setPostOwner] = useState(null);
  // to decrease fetch time, calculate like count in front end
  const [curLikeCount, setCurLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

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
    const hasLiked = await userLikedPost(data.uid, data.postId);
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
      <PostHeader postOwner={postOwner} />
      <img className='postImage' src={data.photoURL} alt='post' />
      <div className="iconBar">
        <LikePostIcon data={data} liked={liked} setLiked={setLiked}
          curLikeCount={curLikeCount} setCurLikeCount={setCurLikeCount} />
        <CommentIcon />
        <SaveIcon />
      </div>
      <p className='likeCount'>{getLikeCountText()}</p>
      <PostText postOwner={postOwner} text={data.text} data={data} />
      <div className='fullLine'></div>
      <CommentInput />
    </div>
  )
}

export default Post;