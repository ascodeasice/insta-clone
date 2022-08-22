import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { UserProvider } from './components/contexts/UserContext';

const App = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
