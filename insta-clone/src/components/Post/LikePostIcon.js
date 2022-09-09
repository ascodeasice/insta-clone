import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
import { unlikePost, likePost, saveLikePostEvent, deleteLikePostEvent } from '../../firebase/firestore';
import { getUid } from '../../firebase/authentication';

const LikePostIcon = ({ data, liked, setLiked, curLikeCount, setCurLikeCount }) => {
  const handleClick = async () => {
    if (liked) {
      await unlikePost(getUid(), data.postId);
      setCurLikeCount(curLikeCount - 1);
      await deleteLikePostEvent(getUid(), data.postId);
    } else {
      await likePost(getUid(), data.postId);
      setCurLikeCount(curLikeCount + 1);
      await saveLikePostEvent(getUid(), data.postId);
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