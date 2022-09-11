const EmptyPosts = ({ src, heading, text }) => {
  return (
    <div className="emptyPosts">
      <div className='roundIconWrapper'>
        <img className="roundBorder emptyPostsIcon" src={src} alt='icon' />
      </div>
      <p className="emptyPostsHeading">{heading}</p>
      <p className="emptyPostsText">{text}</p>
    </div>
  )
}

export default EmptyPosts;