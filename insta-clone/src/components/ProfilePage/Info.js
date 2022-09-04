import User from '../../assets/icons/user.svg';

const Info = ({ userData }) => {
  return (
    <div id='info'>
      <img src={userData ? userData.photoURL : User} alt='user' />
      <p>{userData ? userData.userName : 'loading...'}</p>
      <p>{userData ? userData.fullName : 'loading...'}</p>
    </div>
  )
}

export default Info;