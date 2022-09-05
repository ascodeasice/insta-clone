import WhitePlusSquare from '../../assets/icons/whitePlusSquare.svg';
import BlackPlusSquare from '../../assets/icons/blackPlusSquare.svg';
import AddPostPopUp from '../AddPostPopUp/AddPostPopUp';

const AddPostIcon = ({ index, iconIndex, setIconIndex }) => {
  const handleClick = () => {
    setIconIndex(index);
  }

  return (
    <>
      <img className="navBarIcon" src={iconIndex === index ? BlackPlusSquare : WhitePlusSquare}
        alt='add' onClick={handleClick} />
      <AddPostPopUp index={index} iconIndex={iconIndex} setIconIndex={setIconIndex} />
    </>
  )
}

export default AddPostIcon;