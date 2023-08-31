import React, { useContext, useState } from 'react';

// check if a post is doneSharing by current user
const DoneSharingContext = React.createContext();

const useDoneSharing = () => {
  return useContext(DoneSharingContext);
}

const DoneSharingProvider = ({ children }) => {
  const [doneSharing, setDoneSharing] = useState(false);

  return (
    <DoneSharingContext.Provider value={{ doneSharing, setDoneSharing }}>
      {children}
    </DoneSharingContext.Provider>
  );
}

export { useDoneSharing, DoneSharingProvider };