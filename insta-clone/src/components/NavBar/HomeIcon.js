import WhiteHouse from '../../assets/icons/whiteHouse.svg';
import BlackHouse from '../../assets/icons/blackHouse.svg';

const HomeIcon = ({ index, iconIndex, setIconIndex }) => {
  const handleClick = () => {
    setIconIndex(index);
  }

  return <img className="navBarIcon" src={iconIndex === index ? BlackHouse : WhiteHouse} alt='home'
    onClick={handleClick} />
}

export default HomeIcon;