import '../../styles/UserList.css';
import Cross from '../../assets/icons/cross.svg';
import Follower from './Follower';
import Following from './Following';

const UserList = ({ display, setDisplay, users, heading }) => {
  const cancel = () => { setDisplay(false) }

  return (
    <>
      <div className='darkBg' style={{ display: display ? 'block' : 'none' }} onClick={cancel}></div>
      <div className='userList' style={{ display: display ? 'block' : 'none' }}>
        <div className='userListHeader'>
          <p>{heading}</p>
          <img className='cancel' onClick={cancel} src={Cross} alt='cancel' />
        </div>
        <div className='fullLine'></div>
        {
          !users ? ''
            : heading === 'Followers' ? users.map((doc) =>
              <Follower key={doc.data().uid} uid={doc.data().uid} setDisplay={setDisplay} />)
              : heading === 'Following' ? users.map((doc) =>
                <Following key={doc.data().uid} uid={doc.data().uid} setDisplay={setDisplay} />)
                : <p>Invalid Heading</p>
        }
      </div>
    </>
  );
}

export default UserList;