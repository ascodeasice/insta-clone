import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getPostData } from "../../firebase/firestore";
import Post from "../Post/Post";
import NavBar from "../NavBar/NavBar";
import { useDoneSharing } from "../contexts/DoneSharingContext";
import { useDeletePost } from "../contexts/DeletePostContext";
import { useDoneCommenting } from "../contexts/DoneCommenting";

const PostPage = () => {
  const [postData, setPostData] = useState(null);
  const params = useParams();
  const { doneSharing } = useDoneSharing();
  const { deletePost } = useDeletePost();
  const { doneCommenting } = useDoneCommenting();
  const navigate = useNavigate();

  const fetchData = async () => {
    const postData = await getPostData(params.postId);
    setPostData(postData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (doneSharing || doneCommenting) {
      fetchData();
    }

    if (deletePost) {
      // if post is deleted, go to HomePage
      navigate('/');
    }
  }, [doneSharing, doneCommenting, deletePost]);

  return (
    <>
      <NavBar defaultIconIndex={3} />
      <div id='postPage' className="page">
        {
          // post is deleted
          postData === undefined ? ''
            : postData === null ? <div className="loader"></div>
              : <Post data={postData} />}
      </div>
    </>
  )
}

export default PostPage;