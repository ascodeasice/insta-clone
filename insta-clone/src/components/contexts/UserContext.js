import React, { useContext, useState } from 'react';
import { getUser } from '../../firebase/user';

const UserContext = React.createContext();
const FetchUserContext = React.createContext();

const useUser = () => {
  return useContext(UserContext);
}

const useFetchUser = () => {
  return useContext(FetchUserContext);
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const fetchUser = () => {
    setUser(getUser());
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