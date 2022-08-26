import ProfilePicture from "./ProfilePicture";
import HomeIcon from "./HomeIcon";
import LikeIcon from "./LikeIcon";
import AddPostIcon from "./AddPostIcon";
import { useState } from "react";

const IconContainer = () => {
  const [iconIndex, setIconIndex] = useState(0);

  return (
    <div id="iconContainer">
      <HomeIcon index={0} iconIndex={iconIndex} setIconIndex={setIconIndex} />
      <AddPostIcon index={1} iconIndex={iconIndex} setIconIndex={setIconIndex} />
      <LikeIcon index={2} iconIndex={iconIndex} setIconIndex={setIconIndex} />
      <ProfilePicture setIconIndex={setIconIndex} />
    </div>
  );
}

export default IconContainer;