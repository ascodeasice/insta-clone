import Google from '../../assets/common/google.svg';

const GoogleLoginButton = () => {
  return (
    <button id='googleLoginButton'>
      <img id='googleIcon' src={Google} alt='' />
      Log in with Google
    </button >
  );
}

export default GoogleLoginButton;