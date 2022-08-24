import { useEmail, useFullName, usePassword, useUserName } from "../contexts/signUpContext";

const SignUpButton = () => {
  const { email } = useEmail();
  const { fullName } = useFullName();
  const { userName } = useUserName();
  const { password } = usePassword();


  const dataIsValid = () => {
    const emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    // invalid email 
    if (!emailRegex.test(email)) {
      return false;
    }

    if (fullName === '') {
      return false;
    }

    // if(userNameExist(userName)){
    //   return false;
    // }

    if (password.length < 6) {
      return false;
    }

    return email !== '';
  }

  // send password then

  if (dataIsValid()) {
    return (
      <button id='signUpButton'>Sign Up</button>
    );
  } else {
    return (
      <button id='signUpButton' disabled>Sign Up</button>
    );
  }
}

export default SignUpButton;