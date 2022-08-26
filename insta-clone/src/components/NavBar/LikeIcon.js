import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';

const LikeIcon = ({ index, iconIndex, setIconIndex }) => {
  const handleClick = () => {
    setIconIndex(index);
  }

  return <img className="navBarIcon" src={iconIndex === index ? BlackHeart : WhiteHeart} alt='likes'
    onClick={handleClick} />
}

export default LikeIcon;