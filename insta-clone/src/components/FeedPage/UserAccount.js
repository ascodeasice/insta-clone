import { useUser } from "../contexts/UserContext";
import { signOutUser } from "../../firebase/authentication";

const UserAccount = () => {
  const user = useUser();

  return (
    <div id="userAccount">
      <img id='accountPicture' src={user.photoURL || '#'} alt='user' />
      <div id="names">
        <p id='userName'>{user.userName}</p>
        <p id='fullName'>{user.fullName || ''}</p>
      </div>
      <p id='signOut' onClick={signOutUser}>Sign Out</p>
    </div >
  );
}

export default UserAccount;