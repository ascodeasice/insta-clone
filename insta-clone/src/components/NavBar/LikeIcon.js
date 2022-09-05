import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
import LikePopUp from './LikePopUp';

const LikeIcon = ({ index, iconIndex, setIconIndex }) => {
  const getDefaultIconIndex = () => {
    if (window.location.pathname.includes('profile')) {
      return 3;
    } else {
      return 0;
    }
  }

  // need to wrap in function
  const handleClick = () => {
    setIconIndex(iconIndex === index ? getDefaultIconIndex() : index);
  }

  return (
    <div className='dropDown'>
      <img className="navBarIcon" src={iconIndex === index ? BlackHeart : WhiteHeart} alt='likes'
        onClick={handleClick} />
      <LikePopUp popUpDisplay={iconIndex === index ? 'block' : 'none'} />
    </div>
  );
}

export default LikeIcon;