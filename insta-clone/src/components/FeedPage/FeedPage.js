import NavBar from "../NavBar/NavBar";
import UserAccount from "./UserAccount";
import Post from '../Post/Post';
import '../../styles/FeedPage.css';
import { getPosts } from "../../firebase/firestore";
import { useState, useEffect } from "react";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(await getPosts());
    }

    fetchPosts();
  });

  return (
    <>
      <NavBar />
      <div id="feedPage" className="page">
        <UserAccount />
        {
          posts.map((post, i) => {
            return <Post key={i} data={post.data()} />
          })
        }
        {/* TODO get all posts and map them */}
      </div >
    </>
  );
}

export default FeedPage;