import React, { useContext, useState } from 'react';
import { getUser, userIsLoggedIn } from '../../firebase/authentication';
import { getUserData } from '../../firebase/firestore';

const UserContext = React.createContext();
const FetchUserContext = React.createContext();

const useUser = () => {
  return useContext(UserContext);
}

const useFetchUser = () => {
  return useContext(FetchUserContext);
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    if (!userIsLoggedIn()) {
      setUser(null);
      return;
    }
    const userData = await getUserData(getUser().uid);
    if (userData) {
      setUser(userData);
    } else {
      setUser(getUser());
    }
  }

  return (
    <UserContext.Provider value={user}>
      <FetchUserContext.Provider value={fetchUser}>
        {children}
      </FetchUserContext.Provider>
    </UserContext.Provider>
  );
}

export { useUser, useFetchUser, UserProvider }