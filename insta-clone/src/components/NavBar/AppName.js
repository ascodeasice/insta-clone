import { Link } from "react-router-dom";

const AppName = () => {
  return (
    <Link id='homeLink' to='/'>
      <h2 className="appName">Instagram</h2>
    </Link>
  );
}

export default AppName;