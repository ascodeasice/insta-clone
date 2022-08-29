import PostHeader from "./PostHeader";
import { getUserData } from '../../firebase/firestore';
import { useEffect, useState } from 'react';

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

    </div>
  )
}

export default Post;