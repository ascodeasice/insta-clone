import { useUser } from "../contexts/UserContext";
import ProfilePopUp from "./ProfilePopUp";
import User from '../../assets/icons/user.svg';
import { useState, useEffect } from 'react';

const ProfilePicture = ({ index, iconIndex, setIconIndex }) => {
  const user = useUser();
  const [displayPopUp, setDisplayPopUp] = useState(false);

  const handleClick = () => {
    setIconIndex(index);
    setDisplayPopUp(!displayPopUp);
  }

  useEffect(() => {
    if (iconIndex !== index) {
      setDisplayPopUp(false);
    }
  }, [iconIndex]);

  return (
    <div className='dropDown'>
      <img className="navBarIcon" id='profilePic' src={user ? user.photoURL : User} alt='userPhoto'
        onClick={handleClick} />
      <ProfilePopUp displayPopUp={displayPopUp} setDisplayPopUp={setDisplayPopUp} />
    </div>
  );
}

export default ProfilePicture;