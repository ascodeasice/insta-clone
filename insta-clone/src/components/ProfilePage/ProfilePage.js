import NavBar from '../NavBar/NavBar';
import { DoneSharingProvider } from '../contexts/DoneSharingContext';
import { useEffect, useState } from 'react';
import { getUserData } from '../../firebase/firestore';
import Info from './Info';
import Tab from './Tab';
import '../../styles/ProfilePage.css';

const ProfilePage = ({ defaultTabIndex, pathname }) => {
  const [userData, setUserData] = useState(null);
  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  const fetchUser = async () => {
    const uid = pathname.split('/')[2];
    setUserData(await getUserData(uid));
  }

  useEffect(() => {
    fetchUser();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <DoneSharingProvider>
        <NavBar defaultIconIndex={3} />
        <div id='profilePage' className="page">
          <Info userData={userData} />
          <div className='fullLine'></div>
          <Tab tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </div>
      </DoneSharingProvider>
    </>
  );
}

export default ProfilePage;