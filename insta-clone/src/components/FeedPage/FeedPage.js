import NavBar from "../NavBar/NavBar";
import UserAccount from "./UserAccount";
import Post from '../Post/Post';
import '../../styles/FeedPage.css';
import { getAllPosts, isFollowing } from "../../firebase/firestore";
import { useState, useEffect } from "react";
import { useDoneSharing } from "../contexts/DoneSharingContext";
import { useDeletePost } from "../contexts/DeletePostContext";
import { isThisWeek, fromUnixTime } from "date-fns";
import { getUid } from "../../firebase/authentication";

const FeedPage = () => {
  const [unfollowedPosts, setUnfollowedPosts] = useState([]);
  const [followedPosts, setFollowedPosts] = useState([]);
  const { doneSharing } = useDoneSharing();
  const { deletePost, setDeletePost } = useDeletePost();

  const isFollowedPost = async (doc) => {
    const postDate = fromUnixTime(doc.data().timestamp.seconds);

    return (
      doc.data().uid === getUid()
      || (
        await isFollowing(getUid(), doc.data().uid)
        && isThisWeek(postDate)
      )
    )
  }

  const fetchPosts = async () => {
    const allPostsSnap = sortPostsByTime(await getAllPosts());
    const followedPosts = [];
    const unfollowedPosts = [];

    for (let doc of allPostsSnap) {
      if (await isFollowedPost(doc)) {
        followedPosts.push(doc);
      } else {
        unfollowedPosts.push(doc);
      }
    }

    setUnfollowedPosts(unfollowedPosts);
    setFollowedPosts(followedPosts);
  }

  const sortPostsByTime = (arr) => {
    return arr.sort((a, b) => {
      return a.data().timestamp && b.data().timestamp ?
        b.data().timestamp.seconds - a.data().timestamp.seconds : true
    })
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!doneSharing && !deletePost) {
      return;
    }
    fetchPosts();
    setDeletePost(false);
  }, [doneSharing, deletePost]);

  return (
    <>
      <NavBar defaultIconIndex={0} />
      <div id="feedPage" className="page">
        <UserAccount />
        {
          followedPosts.length === 0 ? ''
            : <>
              <p className="postType">Users you followed</p>
              {
                followedPosts.map(post => <Post key={post.data().postId} data={post.data()} />)
              }
            </>
        }
        {
          unfollowedPosts.length === 0 ? ''
            : <>
              <p className="postType">Recommended for you</p>
              {
                unfollowedPosts.map((post) => {
                  return <Post key={post.data().postId} data={post.data()} />
                })
              }
            </>
        }
      </div >
    </>
  );
}

export default FeedPage;