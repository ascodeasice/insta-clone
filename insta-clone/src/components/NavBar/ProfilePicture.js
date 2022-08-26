import { useUser } from "../contexts/UserContext";

const ProfilePicture = ({ setIconIndex }) => {
  const user = useUser();

  const handleClick = () => {
    setIconIndex(-1);
    // TODO open profile tab
  }
  return (
    <img className="navBarIcon" id='profilePic' src={user.photoURL} alt='userPhoto'
      onClick={handleClick} />
  );
}

export default ProfilePicture;