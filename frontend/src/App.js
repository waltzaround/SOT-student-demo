import React, {useState, useEffect} from 'react';
import './App.css';

const API_URL = "https://sot-demo-1.herokuapp.com"

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
    <>
    <div className="mainContainer">
    <header><h1>LMAObook is a <i>totally legit</i> social network</h1>
    <p>A demo social network with a functional backend and database</p>
    </header>
    <section>
    <div className="post">
    <div className="postForm">
      <label>Write your shitpost here lmao</label>
      <textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      </div>

      <div className="postForm name">
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      </div>
      </div>
      <button onClick={savePost}>Save Post</button>
      </section>
      {posts.map(post => {
        return (
          <>
          <div className="card">
            <h3>{post.message}</h3>
            
            <p>🥳&nbsp;&nbsp;{post.name}</p>
            </div>
          </>
        )
      })}

    </div>
    
    </>
  );
}

export default App;
