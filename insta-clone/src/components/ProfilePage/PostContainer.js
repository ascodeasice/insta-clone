import PostBlock from "./PostBlock";

const PostContainer = ({ posts }) => {
  return (
    <>
      {
        posts.map((post) => {
          return (
            <PostBlock key={post.postId} post={post} />
          )
        })
      }
    </>
  )
}

export default PostContainer;