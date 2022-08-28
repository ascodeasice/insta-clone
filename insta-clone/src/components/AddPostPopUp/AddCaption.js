const AddCaption = ({ imageSrc, defaultValue, setPostText }) => {
  const handleChange = (e) => {
    setPostText(e.target.value);
  }

  return (
    <div id="createPostContainer">
      <img id='previewImage' src={imageSrc} />
      <textarea id='captionInput' defaultValue={defaultValue ? defaultValue : ''}
        placeholder="Write a caption..." onChange={handleChange} />
    </div>
  )
}

export default AddCaption;