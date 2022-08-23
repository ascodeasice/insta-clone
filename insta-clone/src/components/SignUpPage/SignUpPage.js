import AccountInputContainer from "../common/AccountInputContainer";
import SignUpInput from "./SignUpInput";
import SignUpTerms from "./SignUpTerms";
import SignUpButton from "./SignUpButton";
import LoginBox from "./LoginBox";
import '../../styles/SignUpPage.css';

const SignUpPage = () => {
  return (
    <div id="signUpPage" className="page">
      <AccountInputContainer>
        <SignUpInput />
        <SignUpTerms />
        <SignUpButton />
      </AccountInputContainer>
      <LoginBox />
    </div>
  )
}

export default SignUpPage;