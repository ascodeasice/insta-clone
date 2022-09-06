import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { UserProvider } from './components/contexts/UserContext';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { userIsLoggedIn } from './firebase/authentication';
import { useEffect } from 'react';
import EditProfilePage from './components/EditProfilePage/EditProfilePage';

const App = () => {
  const navigate = useNavigate();

  // prevent user use app without logging in
  useEffect(() => {
    if (!userIsLoggedIn()) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/account/edit' element={<EditProfilePage />} />
          <Route path='/profile/*/saved' element={<ProfilePage defaultTabIndex={1} pathname={window.location.pathname} />} />
          <Route path='/profile/*' element={<ProfilePage defaultTabIndex={0} pathname={window.location.pathname} />} />
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}


export default App;
