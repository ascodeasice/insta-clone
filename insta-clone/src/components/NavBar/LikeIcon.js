import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
import LikePopUp from './LikePopUp';

const LikeIcon = ({ index, iconIndex, setIconIndex }) => {
  // need to wrap in function
  const handleClick = () => {
    setIconIndex(index);
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