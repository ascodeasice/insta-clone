import { getUserData } from "../../firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Comment = ({ uid, text }) => {
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    const userDataSnap = await getUserData(uid);
    setUserData(userDataSnap)
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="comment">
      <p className="userName">{userData ? userData.userName : 'loading'}</p>
      <p className='commentText'>{text}</p>
    </div>
  );
}

export default Comment;