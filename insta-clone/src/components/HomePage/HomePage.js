import { userIsloggedIn } from '../../firebase/authentication';
import { saveUserData } from '../../firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useFetchUser } from '../contexts/UserContext';
import SignUpPage from '../SignUpPage/SignUpPage';
import FeedPage from '../FeedPage/FeedPage';
import { useEffect } from 'react';
import { DoneSharingProvider } from '../contexts/DoneSharingContext';

const HomePage = () => {
  // if not logged in, show SignUpPage. Else, show FeedPage
  const fetchUser = useFetchUser();

  useEffect(() => {
    onAuthStateChanged(getAuth(), () => {
      fetchUser();
      saveUserData();
    });
  }, []);

  if (userIsloggedIn()) {
    return (
      <DoneSharingProvider>
        <FeedPage />
      </DoneSharingProvider>
    );
  } else {
    return <SignUpPage />
  }
}

export default HomePage;