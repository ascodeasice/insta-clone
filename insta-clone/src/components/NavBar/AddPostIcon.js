import WhitePlusSquare from '../../assets/icons/whitePlusSquare.svg';
import BlackPlusSquare from '../../assets/icons/blackPlusSquare.svg';
import AddPostPopUp from '../AddPostPopUp/AddPostPopUp';
import { Link } from 'react-router-dom';

const AddPostIcon = ({ index, iconIndex, setIconIndex }) => {
  const handleClick = () => {
    setIconIndex(index);
  }

  return (
    <>
      <Link to='/'>
        <img className="navBarIcon" src={iconIndex === index ? BlackPlusSquare : WhitePlusSquare}
          alt='add' onClick={handleClick} />
      </Link>
      <AddPostPopUp index={index} iconIndex={iconIndex} setIconIndex={setIconIndex} />
    </>
  )
}

export default AddPostIcon;