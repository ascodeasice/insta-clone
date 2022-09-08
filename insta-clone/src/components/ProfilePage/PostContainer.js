import PostBlock from "./PostBlock";

const PostContainer = ({ posts }) => {
  return (
    <>
      {
        posts === null ? <p>Loading...</p>
          : posts.length === 0 ? <p>TODO add something</p>
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