import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
import { unlikePost, likePost, } from '../../firebase/firestore';

const LikePostIcon = ({ data, liked, setLiked, curLikeCount, setCurLikeCount }) => {
  const handleClick = async () => {
    if (liked) {
      await unlikePost(data.uid, data.postId);
      setCurLikeCount(curLikeCount - 1);
    } else {
      await likePost(data.uid, data.postId);
      setCurLikeCount(curLikeCount + 1);
    }
    setLiked(!liked);
  }

  const getClassName = () => {
    if (liked) {
      return 'likeIcon pinkFilter';
    } else {
      return 'likeIcon';
    }
  }

  const getSrc = () => {
    return liked ? BlackHeart : WhiteHeart;
  }

  return <img className={getClassName()} src={getSrc()} onClick={handleClick} alt='like' />
}

export default LikePostIcon;