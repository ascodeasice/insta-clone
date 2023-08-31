import { useEffect, useState } from "react";
import { getUserPosts, getPostData } from "../../firebase/firestore";
import { useDoneSharing } from "../contexts/DoneSharingContext";
import PostContainer from "./PostContainer";
import EmptyPosts from "./EmptyPosts";
import Camera from '../../assets/icons/camera.svg';

const Posts = ({ userData }) => {
  const [posts, setPosts] = useState(null);
  const { doneSharing } = useDoneSharing();

  const fetchPosts = async () => {
    const userPostIds = (await getUserPosts(userData.uid)).map(doc => doc.data().postId);
    const userPosts = [];

    // NOTE for-each loop can't perform async,await
    for (let id of userPostIds) {
      userPosts.push(await getPostData(id));
    }

    const sortedPosts = userPosts.sort((a, b) => b.timestamp - a.timestamp);

    setPosts(sortedPosts);
  }

  useEffect(() => {
    if (userData === null && !doneSharing) {
      return;
    }
    fetchPosts();
  }, [userData, doneSharing]);

  return (
    <div className='posts'>
      {
        posts === null ? <p>Loading...</p>
          : posts.length === 0 ? <EmptyPosts src={Camera} heading='Share Photos'
            text={'When you share photos, they will appear on your profile.'} />
            : <PostContainer posts={posts} />
      }
    </div>
  )
}

export default Posts;