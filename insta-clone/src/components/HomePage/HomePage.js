import { userIsLoggedIn } from '../../firebase/authentication';
import { saveUserData } from '../../firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useFetchUser } from '../contexts/UserContext';
import SignUpPage from '../SignUpPage/SignUpPage';
import FeedPage from '../FeedPage/FeedPage';
import { useEffect } from 'react';
import { DoneSharingProvider } from '../contexts/DoneSharingContext';
import { DoneCommentingProvider } from '../contexts/DoneCommenting';
import { DeletePostProvider } from '../contexts/DeletePostContext';

const HomePage = () => {
  // if not logged in, show SignUpPage. Else, show FeedPage
  const fetchUser = useFetchUser();

  useEffect(() => {
    onAuthStateChanged(getAuth(), () => {
      fetchUser();
      saveUserData();
    });
  }, []);

  if (userIsLoggedIn()) {
    return (
      <DoneCommentingProvider>
        <DoneSharingProvider>
          <DeletePostProvider>
            <FeedPage />
          </DeletePostProvider>
        </DoneSharingProvider>
      </DoneCommentingProvider>
    );
  } else {
    return <SignUpPage />
  }
}

export default HomePage;