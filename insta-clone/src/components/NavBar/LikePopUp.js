import { getAllLikePostEvents, sortEvents } from "../../firebase/firestore";
import { getUid } from "../../firebase/authentication";
import { useState, useEffect } from 'react';
import LikePostEvent from "./LikePostEvent";
import '../../styles/LikePopUp.css';

const LikePopUp = ({ popUpDisplay }) => {
  const [likePostEvents, setLikePostEvents] = useState([]);

  const fetchLikePostEvents = async () => {
    const events = sortEvents(await getAllLikePostEvents(getUid()));
    setLikePostEvents(events);
  }

  useEffect(() => {
    fetchLikePostEvents();
  }, []);

  return (
    <>
      <div className="upArrow" style={{ display: popUpDisplay }}></div>
      <div id="likePopUp" style={{ display: popUpDisplay }}>
        <p id='earlierText'>Earlier</p>
        {
          likePostEvents.map(event => <LikePostEvent key={event.data().id} event={event} />)
        }
        {/* TODO {userName} followed you */}
      </div>
    </>
  );
}

export default LikePopUp;