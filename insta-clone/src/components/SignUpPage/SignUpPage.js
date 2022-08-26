import AccountInputContainer from "../common/AccountInputContainer";
import SignUpTerms from "./SignUpTerms";
import '../../styles/SignUpPage.css';

const SignUpPage = () => {
  return (
    <div id="signUpPage" className="page">
      <AccountInputContainer>
        <SignUpTerms />
      </AccountInputContainer>
    </div>
  )
}

export default SignUpPage;