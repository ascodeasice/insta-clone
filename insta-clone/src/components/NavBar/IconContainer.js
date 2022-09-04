import ProfilePicture from "./ProfilePicture";
import HomeIcon from "./HomeIcon";
import LikeIcon from "./LikeIcon";
import AddPostIcon from "./AddPostIcon";
import { useState } from "react";
import { Link } from "react-router-dom";

const IconContainer = ({ defaultIconIndex }) => {
  const [iconIndex, setIconIndex] = useState(defaultIconIndex);

  return (
    <div id="iconContainer">
      <Link to='/'>
        <HomeIcon index={0} iconIndex={iconIndex} setIconIndex={setIconIndex} />
      </Link>
      <AddPostIcon index={1} iconIndex={iconIndex} setIconIndex={setIconIndex} />
      <LikeIcon index={2} iconIndex={iconIndex} setIconIndex={setIconIndex} />
      <ProfilePicture index={3} iconIndex={iconIndex} setIconIndex={setIconIndex} />
    </div>
  );
}

export default IconContainer;