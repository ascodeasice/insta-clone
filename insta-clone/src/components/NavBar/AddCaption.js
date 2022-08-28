const AddCaption = ({ imageSrc, defaultValue }) => {
  return (
    <div id="createPostContainer">
      <img id='previewImage' src={imageSrc} />
      <textarea id='captionInput' defaultValue={defaultValue ? defaultValue : ''} placeholder="Write a caption..." />
    </div>
  )
}

export default AddCaption;