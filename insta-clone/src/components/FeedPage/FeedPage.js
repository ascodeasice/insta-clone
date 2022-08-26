import { signOutUser } from "../../firebase/authentication";
import NavBar from "../NavBar/NavBar";

const FeedPage = () => {
  return (
    <>
      <NavBar />
      <div id="feedPage" className="page">
        <button onClick={signOutUser}>Sign Out</button>
      </div >
    </>
  );
}

export default FeedPage;