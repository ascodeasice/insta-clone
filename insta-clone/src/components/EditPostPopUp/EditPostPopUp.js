import AddCaption from "../AddPostPopUp/AddCaption";
import EditHeader from "./EditHeader";
import { useState, useEffect } from 'react';
import Posting from "../AddPostPopUp/Posting";
import { useDoneSharing } from '../contexts/DoneSharingContext';
import Cross from '../../assets/icons/cross.svg';

const EditPostPopUp = ({ imageSrc, originText, displayEditPopUp, setDisplay, data }) => {
  const [text, setText] = useState(originText);
  const { doneSharing, setDoneSharing } = useDoneSharing();
  const [edited, setEdited] = useState(false);

  const handleClickBg = () => {
    setDisplay(false);
  }

  useEffect(() => {
    if (displayEditPopUp) {
      setEdited(false);
      setDoneSharing(false);
    }
  }, [displayEditPopUp])

  return (
    <>
      <div className='darkBg' style={{ display: displayEditPopUp ? 'block' : 'none' }} onClick={handleClickBg}>
        <img className='cancelIcon' src={Cross} alt='cancel' onClick={handleClickBg} />
      </div>
      <div id="addPostPopUp" style={{ display: displayEditPopUp ? 'block' : 'none' }}>
        <EditHeader setDisplay={setDisplay} done={doneSharing} setDone={setDoneSharing} text={text}
          data={data} setEdited={setEdited} />
        {edited ?
          <Posting done={doneSharing} />
          : <AddCaption imageSrc={imageSrc} defaultValue={text} setPostText={setText} />
        }
      </div>
    </>
  );
}

export default EditPostPopUp;