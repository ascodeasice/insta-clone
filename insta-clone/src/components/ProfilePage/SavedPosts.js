import { useEffect, useState } from "react";
import { getSavedPosts, getPostData } from "../../firebase/firestore";
import { useDoneSharing } from "../contexts/DoneSharingContext";
import PostContainer from "./PostContainer";
import BookMark from '../../assets/icons/bookmark.svg';
import EmptyPosts from "./EmptyPosts";

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
      {
        savedPosts === null ? <p>Loading...</p>
          : savedPosts.length === 0 ? <EmptyPosts src={BookMark} heading='Save'
            text={'Save photos and videos that you want to see again. \nNo one is notified, and only you can see what you\'ve saved.'} />
            : <PostContainer posts={savedPosts} />
      }
    </div>
  );
}

export default SavedPosts;