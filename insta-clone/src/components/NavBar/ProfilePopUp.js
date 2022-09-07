import Profile from '../../assets/icons/profile.svg';
import BookMark from '../../assets/icons/bookmark.svg';
import { Link } from 'react-router-dom';
import { getUid } from '../../firebase/authentication';

const ProfilePopUp = ({ displayPopUp, setDisplayPopUp }) => {
  const hidePopUp = () => {
    setDisplayPopUp(false);
  }

  return (
    <>
      <div className="upArrow" style={{ display: displayPopUp ? 'block' : 'none' }}></div>
      <div id="likePopUp" className='profilePopUp' style={{ display: displayPopUp ? 'grid' : 'none' }}>
        <Link to={`/profile/${getUid()}`} onClick={hidePopUp}>
          <img src={Profile} alt='' />
          <p className='smallText'>Profile</p>
        </Link>
        <Link to={`/profile/saved/${getUid()}`} onClick={hidePopUp}>
          <img src={BookMark} alt='' />
          <p className='smallText'>Saved</p>
        </Link>
      </div>
    </>
  );
}

export default ProfilePopUp;