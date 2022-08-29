const Posting = ({ done }) => {
  if (done) {
    return (
      <div id="loadingPopUp">
        <h1>Your Post has been shared.</h1>
      </div>
    );
  } else {
    return (
      <div id='loadingPopUp'>
        <div className="loader"></div>
      </div>
    );
  }
}

export default Posting;