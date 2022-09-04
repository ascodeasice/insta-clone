import Profile from '../../assets/icons/profile.svg';
import BookMark from '../../assets/icons/bookmark.svg';
import { Link } from 'react-router-dom';
import { getUid } from '../../firebase/authentication';

const ProfilePopUp = ({ popUpDisplay }) => {
  return (
    <>
      <div className="upArrow" style={{ display: popUpDisplay ? 'block' : 'none' }}></div>
      <div id="likePopUp" className='profilePopUp' style={{ display: popUpDisplay ? 'grid' : 'none' }}>
        <Link to={`/profile/${getUid()}`}>
          <img src={Profile} alt='' />
          <p className='smallText'>Profile</p>
        </Link>
        <Link to={`/profile/${getUid()}/saved`}>
          <img src={BookMark} alt='' />
          <p className='smallText'>Saved</p>
        </Link>
      </div>
    </>
  );
}

export default ProfilePopUp;