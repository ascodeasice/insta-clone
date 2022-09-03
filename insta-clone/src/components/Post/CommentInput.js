import { useState } from "react"

const CommentInput = () => {
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const postComment = () => {
    console.log('posting comment:', comment);
    setComment('');
  }

  const getPostClassName = () => {
    // disable it when there's no comment
    return comment === '' ? 'disabled' : '';
  }
  return (
    <div className="commentInputContainer">
      <input className='commentInput' placeholder="Add a comment..."
        value={comment} onChange={handleChange} type='text' />
      <p onClick={postComment} className={getPostClassName()}>Post</p>
    </div>
  )
}

export default CommentInput;