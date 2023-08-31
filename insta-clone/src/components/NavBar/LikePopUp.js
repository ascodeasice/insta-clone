import EventContainer from "./EventContainer";

const LikePopUp = ({ popUpDisplay }) => {
  return (
    <>
      <div className="upArrow" style={{ display: popUpDisplay }}></div>
      <div id="likePopUp" style={{ display: popUpDisplay }}>
        <EventContainer />
      </div>
    </>
  );
}

export default LikePopUp;