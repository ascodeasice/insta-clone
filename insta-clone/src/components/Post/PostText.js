import { useState, useEffect } from "react";
import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import { capitalize } from '../../functions/format';
import { getComments } from "../../firebase/firestore";
import Comment from "./Comment";
import { useDoneCommenting } from "../contexts/DoneCommenting";
import { useDoneSharing } from "../contexts/DoneSharingContext";
import { Link } from "react-router-dom";

const PostText = ({ text, postOwner, data }) => {
  const [shown, setShown] = useState(false);
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const { doneCommenting, setDoneCommenting } = useDoneCommenting();
  const { doneSharing } = useDoneSharing();
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

  const sortCommentsByTime = (arr) => {
    return arr.sort((a, b) => {
      return a.data().timestamp && b.data().timestamp ?
        b.data().timestamp.seconds - a.data().timestamp.seconds : true
    })
  }

  const formatComments = () => {
    const sortedComments = sortCommentsByTime(comments);

    // show first two when first rendering
    if (showAllComments) {
      return sortedComments.map((doc) => <Comment key={doc.data().id} postId={data.postId} commentId={doc.data().id} uid={doc.data().uid} text={doc.data().text} />)
    } else {
      return sortedComments.slice(0, 2)
        .map((doc) => <Comment key={doc.data().id} postId={data.postId} commentId={doc.data().id} uid={doc.data().uid} text={doc.data().text} />);
    }
  }

  const fetchComments = async () => {
    const commentDocs = await getComments(data.postId);
    setComments(commentDocs);
  }

  const showComments = () => {
    setShowAllComments(true);
  }

  const getProfileLink = () => {
    if (postOwner) {
      return `/profile/${postOwner.uid}`;
    } else {
      return '/';
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (!doneCommenting && !doneSharing) {
      return;
    }
    fetchComments();
    setDoneCommenting(false);
  }, [doneCommenting, doneSharing]);

  return (
    <>
      <Link to={getProfileLink()} className="postUserName paddingLeft">{postOwner ? `${postOwner.userName} ` : 'loading '}</Link>
      <p className={`postText ${shown ? '' : 'hidden'}`}>
        {shown ? text : hideText()}</p>
      {
        shown ? '' : <p className='moreText' onClick={showText}>more</p>
      }
      {
        showAllComments || comments.length <= 2 ? '' :
          <p className="moreText paddingLeft" onClick={showComments}>View all {comments.length} comments</p>
      }
      {
        formatComments()
      }
      <p className='paddingLeft postTime grey'>{formatTimeFromNow()}</p>
    </>
  );
}

export default PostText;