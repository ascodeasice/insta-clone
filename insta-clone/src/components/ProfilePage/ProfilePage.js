import NavBar from '../NavBar/NavBar';
import { DoneSharingProvider } from '../contexts/DoneSharingContext';
import { useEffect, useState } from 'react';
import { getUserData } from '../../firebase/firestore';
import Info from './Info';
import '../../styles/ProfilePage.css';

const ProfilePage = ({ tabIndex, pathname }) => {
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    const pathname = window.location.pathname;
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
        </div>
      </DoneSharingProvider>
    </>
  );
}

export default ProfilePage;