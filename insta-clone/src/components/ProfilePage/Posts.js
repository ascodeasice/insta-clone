import { useEffect, useState } from "react";
import { getUserPosts, getPostData } from "../../firebase/firestore";
import { useDoneSharing } from "../contexts/DoneSharingContext";

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
    <div id='posts'>
      {
        posts === null ? <p>Loading...</p>
          : posts.length === 0 ? <p>{posts.length}</p>
            : posts.map((post) => {
              return <img key={post.postId} src={post.photoURL} alt='post' />
            })
      }
    </div>
  )
}

export default Posts;