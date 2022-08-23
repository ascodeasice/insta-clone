import { Link } from 'react-router-dom';

const LoginBox = () => {
  return (
    <div id='loginBox'>
      <p>Have an account?</p>
      <Link className='link' to='/login'>Log in</Link>
    </div>
  )
}

export default LoginBox;