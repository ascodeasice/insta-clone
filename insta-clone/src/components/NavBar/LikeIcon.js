import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
import LikePopUp from './LikePopUp';
import { useState } from 'react';

const LikeIcon = ({ index, iconIndex, setIconIndex }) => {
  const [display, setDisplay] = useState('none');
  const handleClick = () => {
    setIconIndex(index);
    setDisplay('block');
  }

  return (
    <div className='dropDown'>
      <img className="navBarIcon" src={iconIndex === index ? BlackHeart : WhiteHeart} alt='likes'
        onClick={handleClick} />
      <LikePopUp popUpDisplay={display} />
    </div>
  );
}

export default LikeIcon;