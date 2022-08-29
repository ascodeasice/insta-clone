import NavBar from "../NavBar/NavBar";
import UserAccount from "./UserAccount";
import Post from '../Post/Post';
import '../../styles/FeedPage.css';

const FeedPage = () => {
  return (
    <>
      <NavBar />
      <div id="feedPage" className="page">
        <UserAccount />
        {/* TODO get all posts and map them */}
      </div >
    </>
  );
}

export default FeedPage;