import PostItem from './PostItem'

function PostList({ posts, onAddComment, onToggleLike }) {
  return (
    <div className="post-list">
      <h2>Recent Posts ({posts.length})</h2>
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onAddComment={onAddComment}
          onToggleLike={onToggleLike}
        />
      ))}
    </div>
  )
}

export default PostList