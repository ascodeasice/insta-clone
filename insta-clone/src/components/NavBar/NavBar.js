import AppName from "./AppName";
import IconContainer from "./IconContainer";
import '../../styles/NavBar.css';

const NavBar = () => {
  return (
    <div id='navBar' className="box">
      <AppName />
      <IconContainer />
    </div>
  );
}

export default NavBar