import { useUser, useFetchUser } from '../contexts/UserContext';
import ProfilePicture from '../../assets/icons/user.svg';
import { updateProfile, updateProfilePicture } from '../../firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUid } from '../../firebase/authentication';

const EditForm = () => {
  const user = useUser();
  const fetchUser = useFetchUser();
  const [uploadingProfilePicture, setUploadingProfilePicture] = useState(false);
  const [userName, setUserName] = useState(user ? user.userName : 'loading...');
  const [fullName, setFullName] = useState(user ? user.fullName : 'loading...');
  const [bio, setBio] = useState(user ? user.bio || '' : 'loading...');

  const userNameIsInvalid = () => {
    return userName.includes(' ') || userName.length < 1;
  }

  const fullNameIsInvalid = () => fullName.length < 1;

  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (userNameIsInvalid() || fullNameIsInvalid()) {
      return;
    }
    updateProfile(userName, fullName, bio);
    navigate(`/profile/${getUid()}`);
    fetchUser();
  }

  const handleUpload = async (e) => {
    const curFile = e.target.files[0];
    setUploadingProfilePicture(true);
    await updateProfilePicture(curFile);
    fetchUser();
    setUploadingProfilePicture(false);
  }

  return (
    <form id='editProfileForm' className='box'>
      <div id="uploadWrapper">
        <img id='profilePicture' src={user ? user.photoURL : ProfilePicture} alt='user' />
        {
          uploadingProfilePicture ? ''
            : <input id='uploadInput' type='file' accept="image/png, image/gif, image/jpeg"
              onChange={handleUpload} />
        }
      </div>
      <div id='textContainer'>
        <p id='userName'>{userName}</p>
        <div id="uploadWrapper">
          {
            uploadingProfilePicture ? <p id='changeProfilePicture' className='blue'>Uploading...</p>
              : <>
                <p id='changeProfilePicture' className='blue'>Change profile photo</p>
                <input id='uploadInput' type='file' accept="image/png, image/gif, image/jpeg"
                  onChange={handleUpload} />
              </>
          }
        </div>
      </div>
      <label htmlFor='fullNameInput'>Name</label>
      <input type='text' id='fullNameInput' className='box' value={fullName}
        onChange={(e) => setFullName(e.target.value)} minLength={1} required />
      <label htmlFor='userNameInput' > Username</label >
      <input type='text' id='userNameInput' className='box' value={userName}
        onChange={(e) => setUserName(e.target.value.replace(' ', '_'))} minLength={1} required />
      < label id='bioLabel' htmlFor='bio' > Bio</label >
      <textarea id='bio' className='box' value={bio}
        onChange={(e) => setBio(e.target.value)} />
      <button id='submitButton' onClick={submit}>Submit</button>
    </form >
  );
}

export default EditForm;