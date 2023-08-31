import NavBar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import { getUserData } from '../../firebase/firestore';
import Info from './Info';
import Tab from './Tab';
import Posts from './Posts';
import SavedPosts from './SavedPosts';
import '../../styles/ProfilePage.css';

const ProfilePage = ({ defaultTabIndex, pathname }) => {
  const [userData, setUserData] = useState(null);
  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  const fetchUser = async () => {
    let uid = 'none';
    setTabIndex(defaultTabIndex);
    if (defaultTabIndex === 0) {
      uid = pathname.split('/')[2];
    } else {
      uid = pathname.split('/')[3];
    }
    setUserData(await getUserData(uid));
  }

  useEffect(() => {
    fetchUser();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NavBar defaultIconIndex={3} />
      <div id='profilePage' className="page">
        <Info userData={userData} />
        <div className='fullLine'></div>
        <Tab tabIndex={tabIndex} setTabIndex={setTabIndex} userData={userData} />
        {
          userData !== null && tabIndex === 0 ? <Posts userData={userData} />
            : <SavedPosts userData={userData} />
        }
      </div>
    </>
  );
}

export default ProfilePage;