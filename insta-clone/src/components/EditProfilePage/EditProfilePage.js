import EditForm from "./EditForm";
import '../../styles/EditProfilePage.css';
import NavBar from "../NavBar/NavBar";

const EditProfilePage = () => {
  return (
    <>
      <NavBar defaultIconIndex={3} />
      <div id='editProfilePage' className='page'>
        <EditForm />
      </div>
    </>
  );
}

export default EditProfilePage;