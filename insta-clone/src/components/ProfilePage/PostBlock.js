import { useState, useEffect } from "react";
import BlackComment from '../../assets/icons/blackComment.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
import { getComments } from "../../firebase/firestore";
import { Link } from "react-router-dom";

const PostBlock = ({ post }) => {
  const [showBackground, setShowBackground] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showPost, setShowPost] = useState(false);

  const handleHover = () => {
    setShowBackground(true);
  }

  const handleLeave = () => {
    setShowBackground(false);
  }

  const fetchCommentCount = async () => {
    const comments = await getComments(post.postId);
    setCommentCount(comments.length);
  }

  useEffect(() => {
    fetchCommentCount();
  }, []);

  return (
    <Link to={`/post/${post.postId}`}>
      <div className="postContainer" onMouseOver={handleHover} onMouseLeave={handleLeave}>
        <img src={post.photoURL} alt='post' />
        <div className="hoverBackground" style={{ visibility: showBackground ? 'visible' : 'hidden' }}>
          {
            post.likeCount === 0 ? ''
              : <div className='iconWrapper'>
                <img className="postBlockIcon whiteFilter" src={BlackHeart} alt='likes' />
                <p className="postBlockText">{post.likeCount}</p>
              </div>
          }
          <div className="iconWrapper">
            <img className="postBlockIcon whiteFilter" src={BlackComment} alt='comments' />
            <p className="postBlockText">{commentCount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostBlock;