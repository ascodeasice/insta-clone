import { deletePost } from "../../firebase/firestore";
import { getUid } from "../../firebase/authentication";
import { useDeletePost } from "../contexts/DeletePostContext";
import { useState } from "react";
import EditPostPopUp from "../EditPostPopUp/EditPostPopUp";

const PostMorePopUp = ({ display, setDisplayPopUp, data }) => {
  const { setDeletePost } = useDeletePost();
  const [displayEditPopUp, setDisplayEditPopUp] = useState(false);

  const cancelPopUp = () => {
    setDisplayPopUp(false);
  }

  const handleDelete = async () => {
    await deletePost(data.postId);
    setDeletePost(true);
    cancelPopUp();
  }

  const editPost = () => {
    setDisplayPopUp(false);
    setDisplayEditPopUp(true);
  }

  return (
    <>
      <div className='darkBg' style={{ display: display ? 'block' : 'none' }} onClick={cancelPopUp}></div>
      <div id="postMorePopUp" className='popUpMenu' style={{ display: display ? 'block' : 'none' }}>
        {
          data.uid === getUid() ? <>
            <p className="redText" onClick={handleDelete}>Delete</p>
            <div className='fullLine'></div>
            <p onClick={editPost}>Edit</p>
            <div className='fullLine'></div>
          </>
            : ''
        }
        <p onClick={cancelPopUp}>Cancel</p>
      </div>
      <EditPostPopUp imageSrc={data.photoURL} originText={data.text} display={displayEditPopUp}
        setDisplay={setDisplayEditPopUp} data={data} />
    </>
  );
}

export default PostMorePopUp;