import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
import LikePopUp from './LikePopUp';
import { Link } from 'react-router-dom';

const LikeIcon = ({ index, iconIndex, setIconIndex }) => {
  // need to wrap in function
  const handleClick = () => {
    setIconIndex(iconIndex === index ? 0 : index);
  }

  return (
    <div className='dropDown'>
      <Link to='/'>
        <img className="navBarIcon" src={iconIndex === index ? BlackHeart : WhiteHeart} alt='likes'
          onClick={handleClick} />
      </Link>
      <LikePopUp popUpDisplay={iconIndex === index ? 'block' : 'none'} />
    </div>
  );
}

export default LikeIcon;