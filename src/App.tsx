import { useState, useEffect } from 'react'
import { supabase } from './client'
import './App.css'

export default function App() {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({title: "", content: ""})
  const { title, content } = post

  useEffect(() => {
    fetchPosts()
  }, [])
  
  async function fetchPosts() {
    const { data } = await supabase
    .from('posts')
    .select()
    setPosts(data)
    console.log("data: ", data)
  }

  async function createPost() {
    await supabase
      .from('posts')
      .insert([
        { title, content }
      ])
      .single()
    setPost({ title: "", content: "" })
    fetchPosts()
  }

  return (
    <div className="App">
      <input 
        placeholder="Title"
        value={title}
        onChange={e => setPost({ ...post, title: e.target.value})}
      />
      <input 
        placeholder="Content"
        value={content}
        onChange={e => setPost({ ...post, content: e.target.value})}
      />
      <button onClick={createPost}>Create Post</button>
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      }
    </div>
  )
}
