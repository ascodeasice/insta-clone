import WhiteHeart from '../../assets/icons/whiteHeart.svg';
import BlackHeart from '../../assets/icons/blackHeart.svg';
import { useState } from 'react';
import { unlikePost, likePost } from '../../firebase/firestore';
// NOTE when liked, use black heart with css filter

const LikePostIcon = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const handleClick = async () => {
    if (liked) {
      await unlikePost(data.uid, data.postId);
    } else {
      await likePost(data.uid, data.postId);
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