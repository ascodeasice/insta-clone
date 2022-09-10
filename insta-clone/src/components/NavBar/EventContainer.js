import { getAllEvents, sortEvents } from "../../firebase/firestore";
import { getUid } from "../../firebase/authentication";
import { useState, useEffect } from 'react';
import Event from "./Event";
import '../../styles/LikePopUp.css';
import { isToday, fromUnixTime, isThisWeek } from 'date-fns';


const EventContainer = () => {
  const [earlierEvents, setEarlierEvents] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
  const [thisWeekEvents, setThisWeekEvents] = useState([]);

  const isTodayEvent = (event) => {
    return isToday(fromUnixTime(event.data().timestamp.seconds));
  }

  const isThisWeekEvent = (event) => {
    return !isTodayEvent(event) && isThisWeek(fromUnixTime(event.data().timestamp.seconds));
  }

  const isEarlierEvent = (event) => !isTodayEvent(event) && !isThisWeekEvent(event);

  const fetchLikePostEvents = async () => {
    const events = sortEvents(await getAllEvents(getUid()));

    setTodayEvents(events.filter(event => isTodayEvent(event)));
    setThisWeekEvents(events.filter(event => isThisWeekEvent(event)));
    setEarlierEvents(events.filter(event => isEarlierEvent(event)));
  }

  useEffect(() => {
    fetchLikePostEvents();
  }, []);


  return (
    <>
      {
        todayEvents.length === 0 ? ''
          : <>
            <p className="popUpTitle">Today</p>
            {
              todayEvents.map(event => <Event key={event.data().id} event={event} />)
            }
          </>
      }
      {
        thisWeekEvents.length === 0 ? ''
          : <>
            <p className='popUpTitle'>This week</p>
            {
              thisWeekEvents.map(event => <Event key={event.data().id} event={event} />)
            }
          </>
      }
      {
        earlierEvents.length === 0 ? '' :
          <>
            <p className="popUpTitle">Earlier</p>
            {
              earlierEvents.map(event => <Event key={event.data().id} event={event} />)
            }
          </>
      }

    </>
  )
}

export default EventContainer;