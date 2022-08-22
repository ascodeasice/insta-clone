import '../../styles/HomePage.css';
import { useUser, useFetchUser } from '../contexts/UserContext';

const HomePage = () => {
  // if not logged in, show SignUpPage with switching image. Else, show FeedPage
  const user = useUser();
  const fetchUser = useFetchUser();

  return (
    <div id='homePage'>
      <p>{user.name}</p>
      <button onClick={() => fetchUser('mock_id')}></button>
    </div>
  );
}

export default HomePage;