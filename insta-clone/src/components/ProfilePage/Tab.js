import Grid from '../../assets/icons/grid.svg';
import BookMark from '../../assets/icons/bookmark.svg';
import { getUid } from '../../firebase/authentication';

const Tab = ({ tabIndex, setTabIndex, userData }) => {
  // if chosen, border-top will be 1px solid black

  const getTabClassName = (index) => `tab ${tabIndex === index ? 'chosen' : ''}`;

  const getIconClassName = (index) => tabIndex === index ? '' : 'greyFilter'

  return (
    <div id='tabContainer'>
      <div className={getTabClassName(0)} onClick={() => setTabIndex(0)}>
        <img className={getIconClassName(0)} src={Grid} alt='' />
        POSTS</div>
      {
        userData ? userData.uid === getUid() ?
          <div className={getTabClassName(1)} onClick={() => setTabIndex(1)}>
            <img className={getIconClassName(1)} src={BookMark} alt='' />
            SAVED</div>
          : ''
          : ''
      }
    </div >
  )
}

export default Tab;