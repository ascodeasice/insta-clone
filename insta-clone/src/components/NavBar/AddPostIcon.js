import WhitePlusSquare from '../../assets/icons/whitePlusSquare.svg';
import BlackPlusSquare from '../../assets/icons/blackPlusSquare.svg';


const AddPostIcon = ({ index, iconIndex, setIconIndex }) => {
  const handleClick = () => {
    setIconIndex(index);
  }

  return (
    <img className="navBarIcon" src={iconIndex === index ? BlackPlusSquare : WhitePlusSquare} alt='add'
      onClick={handleClick} />
  )
}

export default AddPostIcon;