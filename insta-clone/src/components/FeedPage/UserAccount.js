import { useUser } from "../contexts/UserContext";
import { signOutUser } from "../../firebase/authentication";

const UserAccount = () => {
  const user = useUser();

  return (
    <div id="userAccount">
      <img id='accountPicture' src={user.photoURL || '#'} alt='user' />
      <div id="names">
        <p id='userName'>{user.displayName}</p>
        {/* TODO get username with uid */}
        <p id='fullName'>user name
          {/* TODO get current user fullname(maybe store in db) */}</p>
      </div>
      <p id='signOut' onClick={signOutUser}>Sign Out</p>
    </div >
  );
}

export default UserAccount;