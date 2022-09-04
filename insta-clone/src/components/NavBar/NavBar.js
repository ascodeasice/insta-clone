import AppName from "./AppName";
import IconContainer from "./IconContainer";
import '../../styles/NavBar.css';

const NavBar = ({ defaultIconIndex }) => {
  return (
    <div id='navBar' className="box">
      <AppName />
      <IconContainer defaultIconIndex={defaultIconIndex} />
    </div>
  );
}

export default NavBar