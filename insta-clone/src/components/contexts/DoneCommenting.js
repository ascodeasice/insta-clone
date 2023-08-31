import React, { useState, useContext } from "react";

const DoneCommentingContext = React.createContext();

const useDoneCommenting = () => {
  return useContext(DoneCommentingContext);
}

const DoneCommentingProvider = ({ children }) => {
  const [doneCommenting, setDoneCommenting] = useState(false);

  return (
    <DoneCommentingContext.Provider value={{ doneCommenting, setDoneCommenting }}>
      {children}
    </DoneCommentingContext.Provider>
  );
}

export { useDoneCommenting, DoneCommentingProvider };