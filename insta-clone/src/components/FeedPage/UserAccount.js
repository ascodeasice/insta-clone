import { useUser } from "../contexts/UserContext";
import { signOutUser } from "../../firebase/authentication";
import User from '../../assets/icons/user.svg';

const UserAccount = () => {
  const user = useUser();

  return (
    <div id="userAccount">
      <img id='accountPicture' src={user.photoURL || User} alt='user' />
      <div id="names">
        <p id='userName'>{user.userName || user.displayName || 'none'}</p>
        <p id='fullName'>{user.fullName || user.displayName || 'none'}</p>
      </div>
      <p id='signOut' onClick={signOutUser}>Switch</p>
    </div >
  );
}

export default UserAccount;