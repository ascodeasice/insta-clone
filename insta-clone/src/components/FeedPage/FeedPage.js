import { signOutUser } from "../../firebase/authentication";

const FeedPage = () => {

  return (
    <div id="feedPage" className="page">
      <h1>FeedPage</h1>
      <button onClick={signOutUser}>Sign Out</button>
    </div >
  );
}

export default FeedPage;