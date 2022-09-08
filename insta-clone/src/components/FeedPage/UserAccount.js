import { useUser } from "../contexts/UserContext";
import { signOutUser } from "../../firebase/authentication";
import User from '../../assets/icons/user.svg';
import { Link } from 'react-router-dom';

const UserAccount = () => {
  const user = useUser();

  return (
    <div id="userAccount">
      <Link to={`/profile/${user ? user.uid : ''}`}>
        <img id='accountPicture' src={user.photoURL || User} alt='user' />
      </Link>
      <div id="names">
        <Link to={`/profile/${user ? user.uid : ''}`}>
          <p id='userName'>{user.userName || user.displayName || 'none'}</p>
        </Link>
        <p id='fullName'>{user.fullName || user.displayName || 'none'}</p>
      </div>
      <p id='signOut' onClick={signOutUser}>Switch</p>
    </div >
  );
}

export default UserAccount;