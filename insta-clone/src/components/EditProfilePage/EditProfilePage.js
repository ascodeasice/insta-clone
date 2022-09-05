import EditForm from "./EditForm";
import '../../styles/EditProfilePage.css';
import NavBar from "../NavBar/NavBar";
import { DoneSharingProvider } from "../contexts/DoneSharingContext";

const EditProfilePage = () => {
  return (
    <>
      <DoneSharingProvider>
        <NavBar defaultIconIndex={3} />
        <div id='editProfilePage' className='page'>
          <EditForm />
        </div>
      </DoneSharingProvider>
    </>
  );
}

export default EditProfilePage;