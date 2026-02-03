import { useState } from 'react'

function PostForm({ onAddPost }) {
  const [content, setContent] = useState('')
  const [type, setType] = useState('discussion')
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      setError('Please enter some content')
      return
    }

    if (type === 'question' && !title.trim()) {
      setError('Please enter a question title')
      return
    }

    onAddPost({
      content,
      type,
      title: type === 'question' ? title : null
    })

    // Reset form
    setContent('')
    setTitle('')
    setError('')
  }

  return (
    <div className="post-form">
      <h2>Create Anonymous Post</h2>
      
      <div className="type-selector">
        <label>
          <input
            type="radio"
            name="type"
            value="discussion"
            checked={type === 'discussion'}
            onChange={(e) => setType(e.target.value)}
          />
          Discussion
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="question"
            checked={type === 'question'}
            onChange={(e) => setType(e.target.value)}
          />
          Question
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {type === 'question' && (
          <div className="form-group">
            <input
              type="text"
              placeholder="What's your question?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength="100"
              className="title-input"
            />
          </div>
        )}

        <div className="form-group">
          <textarea
            placeholder={type === 'question' 
              ? "Add more details about your question..." 
              : "What's on your mind? Share your thoughts..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength="500"
            rows="4"
            className="content-input"
          />
          <div className="char-count">{content.length}/500</div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-btn">
          {type === 'question' ? 'Ask Question' : 'Post Discussion'}
        </button>
      </form>
    </div>
  )
}

export default PostForm