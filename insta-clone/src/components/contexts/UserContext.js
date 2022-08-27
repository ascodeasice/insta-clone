import React, { useContext, useState } from 'react';
import { getUser, getUserData, userIsloggedIn } from '../../firebase/authentication';

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
    if (userIsloggedIn()) {
      setUser(await getUserData(getUser().uid));
    } else {
      setUser(null);
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