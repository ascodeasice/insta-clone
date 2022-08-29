import PostHeader from "./PostHeader";
import { getUserData } from '../../firebase/firestore';
import { useEffect, useState } from 'react';
import LikePostIcon from "./LikePostIcon";
import CommentIcon from "./CommentIcon";
import SaveIcon from "./SaveIcon";

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
      <div class="iconBar">
        <LikePostIcon />
        <CommentIcon />
        <SaveIcon />
      </div>
    </div>
  )
}

export default Post;