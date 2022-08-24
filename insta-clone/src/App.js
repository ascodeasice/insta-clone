import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { UserProvider } from './components/contexts/UserContext';
import LoginPage from './components/LoginPage/LoginPage';


const App = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
