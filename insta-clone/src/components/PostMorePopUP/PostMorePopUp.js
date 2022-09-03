import { deletePost } from "../../firebase/firestore";
import { getUid } from "../../firebase/authentication";
import { useDeletePost } from "../contexts/DeletePostContext";

const PostMorePopUp = ({ display, setDisplayPopUp, data }) => {
  const { setDeletePost } = useDeletePost();

  const cancelPopUp = () => {
    setDisplayPopUp(false);
  }

  const handleDelete = async () => {
    await deletePost(data.postId);
    setDeletePost(true);
    cancelPopUp();
  }

  return (
    <>
      <div className='darkBg' style={{ display: display ? 'block' : 'none' }} onClick={cancelPopUp}></div>
      <div id="postMorePopUp" className='popUpMenu' style={{ display: display ? 'block' : 'none' }}>
        {
          data.uid === getUid() ? <>
            <p className="redText" onClick={handleDelete}>Delete</p>
            <div className='fullLine'></div>
            <p>Edit</p>
            <div className='fullLine'></div>
          </>
            : ''
        }
        <p>Go to post</p>
        <div className='fullLine'></div>
        <p onClick={cancelPopUp}>Cancel</p>
      </div>
    </>
  );
}

export default PostMorePopUp;