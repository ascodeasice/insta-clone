import UploadImageIcon from '../../assets/icons/uploadImage.svg';

const UploadImage = ({ setImageSrc, setImageFile }) => {
  const handleUpload = (e) => {
    const curFile = e.target.files[0];
    const objectURL = URL.createObjectURL(curFile);

    setImageFile(curFile);
    setImageSrc(objectURL);
  }

  return (
    <>
      <div id="uploadContainer">
        <img id='uploadIcon' src={UploadImageIcon} alt='' />
        <h2 id='uploadText'>Upload image here</h2>
        <div id="uploadWrapper">
          <button id="uploadButton">Select from computer</button>
          <input id='uploadInput' type='file' accept="image/png, image/gif, image/jpeg"
            onChange={handleUpload} />
        </div >
      </div>
    </>
  );
}

export default UploadImage;