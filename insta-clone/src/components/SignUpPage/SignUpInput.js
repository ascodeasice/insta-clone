const SignUpInput = () => {
  return (
    <>
      <input className='signUpInput' id='emailInput' placeholder="Email" type="text" />
      <input className='signUpInput' id='fullNameInput' placeholder="Full Name" type="text" />
      <input className='signUpInput' id='userNameInput' placeholder="Username" type="text" />
      <input className='signUpInput' id='passwordInput' placeholder="Password" type="password" />
    </>
  );
}

export default SignUpInput;