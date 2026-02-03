import { useState, useEffect } from 'react'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'questions', 'discussions'
  const [searchTerm, setSearchTerm] = useState('')

  // Load posts from localStorage on initial render
  useEffect(() => {
    const savedPosts = localStorage.getItem('chatboard-posts')
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [])

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatboard-posts', JSON.stringify(posts))
  }, [posts])

  const addPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    }
    setPosts([postWithId, ...posts])
  }

  const addComment = (postId, commentText) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          text: commentText,
          timestamp: new Date().toISOString()
        }
        return {
          ...post,
          comments: [...post.comments, newComment]
        }
      }
      return post
    }))
  }

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        }
      }
      return post
    }))
  }

  const filteredPosts = posts.filter(post => {
    // Filter by type
    if (filter !== 'all' && post.type !== filter) return false
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase()
      return (
        post.content.toLowerCase().includes(searchLower) ||
        post.title?.toLowerCase().includes(searchLower)
      )
    }
    
    return true
  })

  return (
    <div className="app">
      <header className="header">
        <h1>💬 ChatBoard Lite</h1>
        <p className="subtitle">Anonymous Discussion Board</p>
      </header>

      <main className="main-content">
        <PostForm onAddPost={addPost} />
        
        <div className="filters">
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All Posts
            </button>
            <button 
              className={filter === 'question' ? 'active' : ''}
              onClick={() => setFilter('question')}
            >
              ❓ Questions
            </button>
            <button 
              className={filter === 'discussion' ? 'active' : ''}
              onClick={() => setFilter('discussion')}
            >
              💭 Discussions
            </button>
          </div>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <PostList 
          posts={filteredPosts}
          onAddComment={addComment}
          onToggleLike={toggleLike}
        />

        {filteredPosts.length === 0 && (
          <div className="no-posts">
            <p>No posts yet. Be the first to start a discussion!</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>ChatBoard Lite • All posts are anonymous • Data saved locally in your browser</p>
        <p>Total Posts: {posts.length} • Total Comments: {posts.reduce((sum, post) => sum + post.comments.length, 0)}</p>
      </footer>
    </div>
  )
}

export default App