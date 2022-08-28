const DiscardPostPopUp = ({ displayDiscard, setImageSrc, setDisplayDiscard, setImageFile }) => {
  const cancel = () => {
    setDisplayDiscard(false);
  }

  const discardPost = () => {
    setImageSrc('#');
    setImageFile(null);
    setDisplayDiscard(false);
  }

  return (
    <>
      <div id='discardBg' className="darkBg" style={{ display: displayDiscard ? 'block' : 'none' }}></div>
      <div id='discardPostPopUp' style={{ display: displayDiscard ? 'grid' : 'none' }}>
        <p id='discardText'>Discard post?</p>
        <p className='grey smallText'>If you leave, your edits won't be saved.</p>
        <button id='discardButton' className="box" onClick={discardPost}>Discard</button>
        <button id='cancelDiscardButton' onClick={cancel}>Cancel</button>
      </div>
    </>
  )
}

export default DiscardPostPopUp;