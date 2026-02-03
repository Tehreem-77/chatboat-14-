import { useState } from 'react'

function PostItem({ post, onAddComment, onToggleLike }) {
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [showFullContent, setShowFullContent] = useState(false)

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      onAddComment(post.id, comment)
      setComment('')
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const contentPreview = post.content.length > 150 && !showFullContent
    ? post.content.substring(0, 150) + '...'
    : post.content

  return (
    <div className={`post-item ${post.type}`}>
      <div className="post-header">
        <div className="post-type">
          {post.type === 'question' ? '❓ Question' : '💭 Discussion'}
        </div>
        <div className="post-time">
          {formatTime(post.timestamp)}
        </div>
      </div>

      {post.title && (
        <h3 className="post-title">{post.title}</h3>
      )}

      <div className="post-content">
        <p>{contentPreview}</p>
        {post.content.length > 150 && (
          <button 
            onClick={() => setShowFullContent(!showFullContent)}
            className="read-more"
          >
            {showFullContent ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      <div className="post-actions">
        <button 
          onClick={() => onToggleLike(post.id)}
          className={`like-btn ${post.liked ? 'liked' : ''}`}
        >
          ❤️ {post.likes || 0}
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="comment-btn"
        >
          💬 {post.comments?.length || 0}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit">
              Comment
            </button>
          </form>

          <div className="comments-list">
            {post.comments?.map(comment => (
              <div key={comment.id} className="comment">
                <p className="comment-text">{comment.text}</p>
                <small className="comment-time">
                  {formatTime(comment.timestamp)}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostItem