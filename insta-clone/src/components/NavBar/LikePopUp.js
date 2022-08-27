const LikePopUp = ({ popUpDisplay }) => {
  return (
    <>
      <div className="upArrow" style={{ display: popUpDisplay }}></div>
      <div id="likePopUp" style={{ display: popUpDisplay }}>
        <p id='earlierText'>Earlier</p>
        {/* TODO {userName} followed you */}
      </div>
    </>
  );
}

export default LikePopUp;