import { editPostText } from "../../firebase/firestore";

const EditHeader = ({ done, setDisplay, setDone, text, data, setEdited }) => {
  const cancel = () => {
    setDisplay(false);
  }

  const edit = async () => {
    setEdited(true);
    await editPostText(data.postId, text);
    setDone(true);
  }

  if (done) {
    return (
      <>
        <h4 id='createPostText'>Post Edited</h4>
        <div className='fullLine'></div>
      </>
    );
  } else {
    return (
      <>
        <div id='popUpHeader'>
          <p className='cancelText' onClick={cancel}>Cancel</p>
          <h4 id='createPostText'>Edit info</h4>
          <p id='shareText' onClick={edit}>Done</p>
        </div>
        <div className='fullLine'></div>
      </>

    )
  }
}

export default EditHeader;