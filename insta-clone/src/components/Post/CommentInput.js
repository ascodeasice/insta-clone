import { useState } from "react";
import { getUid } from "../../firebase/authentication";
import { saveComment } from "../../firebase/firestore";
import { useDoneCommenting } from "../contexts/DoneCommenting";

const CommentInput = ({ data, commentInputRef }) => {
  const [comment, setComment] = useState('');
  const { setDoneCommenting } = useDoneCommenting();

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const postComment = async () => {
    if (comment === '') {
      return;
    }
    setComment('');
    await saveComment(getUid(), data.postId, comment);
    setDoneCommenting(true);
  }

  const getPostClassName = () => {
    // disable it when there's no comment
    return comment === '' ? 'disabled' : '';
  }

  return (
    <div className="commentInputContainer">
      <input className='commentInput' placeholder="Add a comment..."
        value={comment} onChange={handleChange} type='text' ref={commentInputRef} />
      <p onClick={postComment} className={getPostClassName()}>Post</p>
    </div>
  )
}

export default CommentInput;