import { deleteComment } from "../../firebase/firestore";
import { useDoneCommenting } from "../contexts/DoneCommenting";

const CommentPopUp = ({ postId, commentId, display, setDisplay }) => {
  const { setDoneCommenting } = useDoneCommenting();
  const hidePopUp = () => {
    setDisplay(false);
  }

  const handleDelete = async () => {
    await deleteComment(postId, commentId);
    setDoneCommenting(true); // to force re-render
  }

  return (
    <>
      <div className='darkBg' style={{ display: display ? 'block' : 'none' }}></div>
      <div id='postMorePopUp' className="popUpMenu" style={{ display: display ? 'block' : 'none' }}>
        <p className='redText' onClick={handleDelete}>Delete</p>
        <div className="fullLine"></div>
        <p onClick={hidePopUp}>Cancel</p>
      </div>
    </>
  );
}

export default CommentPopUp;