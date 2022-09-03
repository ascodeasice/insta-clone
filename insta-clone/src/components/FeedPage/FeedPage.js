import NavBar from "../NavBar/NavBar";
import UserAccount from "./UserAccount";
import Post from '../Post/Post';
import '../../styles/FeedPage.css';
import { getPosts } from "../../firebase/firestore";
import { useState, useEffect } from "react";
import { useDoneSharing } from "../contexts/DoneSharingContext";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const { doneSharing } = useDoneSharing();

  const fetchPosts = async () => {
    setPosts(await getPosts());
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
    if (!doneSharing) {
      return;
    }
    fetchPosts();
  }, [doneSharing]);

  return (
    <>
      <NavBar />
      <div id="feedPage" className="page">
        <UserAccount />
        {
          sortPostsByTime(posts).map((post) => {
            return <Post key={post.data().postId} data={post.data()} />
          })
        }
      </div >
    </>
  );
}

export default FeedPage;