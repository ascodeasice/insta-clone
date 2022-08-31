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
      setShown(true);
      return text;
    }
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
    </>
  );
}

export default PostText;