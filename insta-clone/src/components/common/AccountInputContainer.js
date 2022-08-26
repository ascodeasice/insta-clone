import GoogleLoginButton from './GoogleLoginButton';
// import OrLine from './OrLine';

const AccountInputContainer = ({ children }) => {
  return (
    <div id="accountInputContainer" className='box'>
      <h1 className='appName'>Instagram</h1>
      <p id='introText'>Sign up to waste your time on funny videos and comparing with others</p>
      <GoogleLoginButton />
      {/* <OrLine /> */}
      {children}
    </div>
  )
}

export default AccountInputContainer;