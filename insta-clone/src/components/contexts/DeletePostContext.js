import React, { useState, useContext } from "react";

const DeletePostContext = React.createContext();

const useDeletePost = () => useContext(DeletePostContext);

const DeletePostProvider = ({ children }) => {
  const [deletePost, setDeletePost] = useState(false);

  return (
    <DeletePostContext.Provider value={{ deletePost, setDeletePost }}>
      {children}
    </DeletePostContext.Provider>
  );
}

export { useDeletePost, DeletePostProvider }