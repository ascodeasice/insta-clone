import PostHeader from "./PostHeader";
import { getUserData } from '../../firebase/firestore';
import { useEffect, useState } from 'react';
import LikePostIcon from "./LikePostIcon";
import CommentIcon from "./CommentIcon";
import SaveIcon from "./SaveIcon";
import PostText from "./PostText";

const Post = ({ data }) => {
  const [postOwner, setPostOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      setPostOwner(await getUserData(data.uid));
    }
    fetchOwner();
  }, []);

  return (
    <div className="post box">
      <PostHeader postOwner={postOwner} />
      <img className='postImage' src={data.photoURL} alt='post' />
      <div className="iconBar">
        <LikePostIcon data={data} />
        <CommentIcon />
        <SaveIcon />
      </div>
      <p className='likeCount'>{!data.likeCount || data.likeCount === 0 ? '' : `${data.likeCount} likes`}</p>
      <PostText postOwner={postOwner} text={data.text} />
    </div>
  )
}

export default Post;