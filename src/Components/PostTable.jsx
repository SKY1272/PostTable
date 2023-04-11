import React, { useState, useEffect } from "react";

// let url = "https://jsonplaceholder.typicode.com/posts";
function PostTable() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  function handleDelete(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    }).then(() => setPosts(posts.filter((post) => post.id !== id)));
  }

  function handleAdd() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then((response) => response.json())
      .then((data) => setPosts([...posts, data]))
      .then(() => setNewPost({ title: "", body: "" }))
      .catch((error) => console.log(error));
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  }
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAdd();
        }}
      >
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Body:
          <input
            type="text"
            name="body"
            value={newPost.body}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add post</button>
      </form>
      <table style={{ border: "1px solid black", backgroundColor: "pink" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>ID</th>
            <th style={{ border: "1px solid black" }}>Title</th>
            <th style={{ border: "1px solid black" }}>Body</th>
            <th style={{ border: "1px solid black" }}>Button</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td style={{ border: "1px solid black" }}>{post.id}</td>
              <td style={{ border: "1px solid black" }}>{post.title}</td>
              <td style={{ border: "1px solid black" }}>{post.body}</td>
              <td style={{ border: "1px solid black" }}>
                <button onClick={() => handleDelete(post.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PostTable;
