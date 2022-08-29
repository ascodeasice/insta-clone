import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
// NOTE when liked, use black heart with css filter

const LikePostIcon = () => {
  return <img className='likeIcon' src={WhiteHeart} alt='like' />
}

export default LikePostIcon;