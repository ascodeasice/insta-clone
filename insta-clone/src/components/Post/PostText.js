import { useState } from "react";

const PostText = ({ text, postOwner }) => {
  const [shown, setShown] = useState(false);
  const lengthLimit = 20;

  const hideText = () => {
    if (text.includes('\n')) {
      const firstPosition = text.indexOf('\n');
      return `${text.slice(0, firstPosition)}...`;
    } else if (text.length > lengthLimit) {
      return `${text.slice(0, lengthLimit)}...`;
    } else {
      return text;
    }
  }

  const showText = () => {
    setShown(true);
  }
  return (
    <>
      <p className={`postText ${shown ? '' : 'hidden'}`}>
        <strong className='postUserName'>{postOwner ? `${postOwner.userName} ` : 'loading '}</strong>
        {shown ? text : hideText()}</p>
      {
        shown ? '' : <p className='moreText' onClick={showText}>more</p>
      }
    </>
  );
}

export default PostText;