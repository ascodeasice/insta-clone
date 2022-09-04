import { useUser } from "../contexts/UserContext";
import ProfilePopUp from "./ProfilePopUp";
import User from '../../assets/icons/user.svg';
import { getUid } from "../../firebase/authentication";

const ProfilePicture = ({ index, iconIndex, setIconIndex }) => {
  const user = useUser();

  const handleClick = () => {
    setIconIndex(index);
  }

  const getPopUpDisplay = () => {
    // not in current user's profile page
    return (
      iconIndex === index &&
      !window.location.pathname.includes('profile') && !window.location.pathname.includes(getUid())
    );
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