import React, { useContext, useState } from "react";

// which icon in nav bar is clicked/should be black
const IconContext = React.createContext();
const SetIconContext = React.createContext();

const useIconIndex = () => {
  return useContext(IconContext);
}

const useSetIconIndex = () => {
  return useContext(SetIconContext);
}

const IconIndexProvider = ({ children }) => {
  const [iconIndex, setIconIndex] = useState(0);

  return (
    <IconContext.Provider value={iconIndex}>
      <SetIconContext.Provider value={setIconIndex}>
        {children}
      </SetIconContext.Provider>
    </IconContext.Provider>
  );
}

export { useIconIndex, useSetIconIndex, IconIndexProvider };