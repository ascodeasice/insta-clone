import { useEmail, useFullName, usePassword, useUserName } from "../contexts/signUpContext";

const SignUpInput = () => {
  const { handleEmailInput } = useEmail();
  const { handleFullNameInput } = useFullName();
  const { handleUserNameInput } = useUserName();
  const { handlePasswordInput } = usePassword();

  return (
    <>
      <input className='signUpInput' id='emailInput' placeholder="Email" type="email" onChange={handleEmailInput} />
      <input className='signUpInput' id='fullNameInput' placeholder="Full Name" type="text" onChange={handleFullNameInput} />
      <input className='signUpInput' id='userNameInput' placeholder="Username" type="text" onChange={handleUserNameInput} />
      <input className='signUpInput' id='passwordInput' placeholder="Password" type="password" onChange={handlePasswordInput} />
    </>
  );
}

export default SignUpInput;