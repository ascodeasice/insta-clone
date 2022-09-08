import PostBlock from "./PostBlock";

const PostContainer = ({ posts, emptyText }) => {
  return (
    <>
      {
        posts === null ? <p>Loading...</p>
          : posts.length === 0 ? <p>{emptyText}</p>
            : posts.map((post) => {
              return (
                <PostBlock key={post.postId} post={post} />
              )
            })
      }
    </>
  )
}

export default PostContainer;