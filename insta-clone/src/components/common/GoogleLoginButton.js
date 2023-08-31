import Google from '../../assets/common/google.svg';
import { googleSignIn } from '../../firebase/authentication';

const GoogleLoginButton = () => {
  return (
    <button id='googleLoginButton' onClick={googleSignIn}>
      <img id='googleIcon' src={Google} alt='' />
      Log in with Google
    </button >
  );
}

export default GoogleLoginButton;