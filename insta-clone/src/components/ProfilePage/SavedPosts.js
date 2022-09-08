import { useEffect, useState } from "react";
import { getSavedPosts, getPostData } from "../../firebase/firestore";
import { useDoneSharing } from "../contexts/DoneSharingContext";
import PostContainer from "./PostContainer";

const SavedPosts = ({ userData }) => {
  const [savedPosts, setSavedPosts] = useState(null);
  const { doneSharing } = useDoneSharing();

  const fetchPosts = async () => {
    const userPostIds = (await getSavedPosts(userData.uid)).map(doc => doc.data().postId);
    const userPosts = [];

    // NOTE for-each loop can't perform async,await
    for (let id of userPostIds) {
      userPosts.push(await getPostData(id));
    }

    const sortedPosts = userPosts.sort((a, b) => b.timestamp - a.timestamp);

    setSavedPosts(sortedPosts);
  }

  useEffect(() => {
    if (userData === null && !doneSharing) {
      return;
    }
    fetchPosts();
  }, [userData, doneSharing]);


  return (
    <div className="posts">
      <PostContainer posts={savedPosts} emptyText="You haven't saved anything" />
    </div>
  );
}

export default SavedPosts;