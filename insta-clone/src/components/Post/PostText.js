import { useState } from "react";
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import fromUnixTime from 'date-fns/fromUnixTime';
import { capitalize } from '../../functions/format';

const PostText = ({ text, postOwner, data }) => {
  const [shown, setShown] = useState(false);
  const lengthLimit = 20;

  const hideText = () => {
    if (text.includes('\n')) {
      const firstPosition = text.indexOf('\n');
      return `${text.slice(0, firstPosition)}...`;
    } else if (text.length > lengthLimit) {
      return `${text.slice(0, lengthLimit)}...`;
    } else {
      setShown(true);
      return text;
    }
  }

  const formatTimeFromNow = () => {
    const str = formatDistanceToNowStrict(fromUnixTime(data.timestamp.seconds), { addSuffix: true });
    return capitalize(str);
  }

  const showText = () => {
    setShown(true);
  }
  return (
    <>
      <p className="postUserName paddingLeft">{postOwner ? `${postOwner.userName} ` : 'loading '}</p>
      <p className={`postText ${shown ? '' : 'hidden'}`}>
        {shown ? text : hideText()}</p>
      {
        shown ? '' : <p className='moreText' onClick={showText}>more</p>
      }
      <p className='paddingLeft postTime grey'>{formatTimeFromNow()}</p>
    </>
  );
}

export default PostText;