const AddPostPopUp = ({ display, setIconIndex }) => {
  const handleClickBg = () => {
    setIconIndex(0);
  }

  return (
    <>
      <div className='darkBg' style={{ display: display }} onClick={handleClickBg}></div>
      <div id='addPostPopUp' style={{ display: display }}>

      </div>
    </>
  );
}

export default AddPostPopUp;