import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL = "http://localhost:5000"

function App() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = () => {
    fetch(API_URL + "/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
  }

  const savePost = () => {
    const post = {
      name: name,
      message: message
    };
    fetch(API_URL + "/posts", { 
      method: "POST", 
      headers: { "content-type" : "application/json"}, 
      body: JSON.stringify(post)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setName("");
          setMessage("");
          getPosts()
        }
      })
  }



  return (
    <div>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>Message</label>
      <input value={message} onChange={(e) => setMessage(e.target.value)}></input>
      <button onClick={savePost}>Save Post</button>
      {posts.map(post => {
        return (
          <>
            <p>{post.name}</p>
            <p>{post.message}</p>
          </>
        )
      })}
    </div>
  );
}

export default App;
