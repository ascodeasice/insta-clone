import { useUser } from "../contexts/UserContext";
import ProfilePopUp from "./ProfilePopUp";
import User from '../../assets/icons/user.svg';

const ProfilePicture = ({ index, iconIndex, setIconIndex }) => {
  const user = useUser();

  const handleClick = () => {
    setIconIndex(index);
  }

  const getPopUpDisplay = () => {
    return iconIndex === index && !window.location.pathname.includes('profile');
  }

  return (
    <div className='dropDown'>
      <img className="navBarIcon" id='profilePic' src={user ? user.photoURL : User} alt='userPhoto'
        onClick={handleClick} />
      <ProfilePopUp popUpDisplay={getPopUpDisplay()} />
    </div>
  );
}

export default ProfilePicture;