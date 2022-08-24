import React, { useState, useContext } from "react"

const EmailContext = React.createContext();
const FullNameContext = React.createContext();
const UserNameContext = React.createContext();
const PasswordContext = React.createContext();

const useEmail = () => useContext(EmailContext);
const useFullName = () => useContext(FullNameContext);
const useUserName = () => useContext(UserNameContext);
const usePassword = () => useContext(PasswordContext);

const SignUpProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }

  const handleFullNameInput = (e) => {
    setFullName(e.target.value);
  }
  const handleUserNameInput = (e) => {
    setUserName(e.target.value);
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }


  return (
    <EmailContext.Provider value={{ email, handleEmailInput }}>
      <FullNameContext.Provider value={{ fullName, handleFullNameInput }}>
        <UserNameContext.Provider value={{ userName, handleUserNameInput }}>
          <PasswordContext.Provider value={{ password, handlePasswordInput }}>
            {children}
          </PasswordContext.Provider>
        </UserNameContext.Provider>
      </FullNameContext.Provider>
    </EmailContext.Provider>
  )
}

export { SignUpProvider, useEmail, useFullName, usePassword, useUserName }