import { userIsloggedIn } from '../../firebase/user';
import SignUpPage from '../SignUpPage/SignUpPage';
import FeedPage from '../FeedPage/FeedPage';

const HomePage = () => {
  // if not logged in, show SignUpPage. Else, show FeedPage
  if (userIsloggedIn()) {
    return <FeedPage />
  } else {
    return <SignUpPage />
  }
}

export default HomePage;