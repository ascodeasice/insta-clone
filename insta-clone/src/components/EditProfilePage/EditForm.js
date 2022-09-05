import { useUser } from '../contexts/UserContext';
import ProfilePicture from '../../assets/icons/user.svg';

const EditForm = () => {
  const user = useUser();

  return (
    <div id='editProfileForm' className='box'>
      <img id='profilePicture' src={user ? user.photoURL : ProfilePicture} alt='user' />
      <div id='textContainer'>
        <p id='userName'>{user ? user.userName : 'loading...'}</p>
        <p id='changeProfilePicture' className='blue'>Change profile photo</p>
      </div>
      <label htmlFor='fullNameInput'>Name</label>
      <input type='text' id='fullNameInput' className='box' defaultValue={user ? user.fullName : 'loading...'} />
      <label htmlFor='userNameInput' > Username</label >
      <input type='text' id='userNameInput' className='box' defaultValue={user ? user.userName : 'loading...'} />
      <label id='bioLabel' htmlFor='bio' > Bio</label >
      <textarea id='bio' className='box' defaultValue={user ? user.bio || '' : 'loading...'} />
      <button id='submitButton'>Sumbit</button>
    </div >
  );
}

export default EditForm;