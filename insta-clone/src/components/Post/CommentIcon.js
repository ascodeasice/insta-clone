import Comment from '../../assets/icons/comment.svg';

const CommentIcon = ({ commentInputRef }) => {
  const focusInput = () => {
    commentInputRef.current.focus();
  }
  return <img className='commentIcon' src={Comment} alt='comment' onClick={focusInput} />
}

export default CommentIcon;