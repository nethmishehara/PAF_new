// frontend/src/ProfileManage/PostList.js
import React, { useEffect, useState } from 'react';

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!userId) return;
  
    fetch(`http://localhost:8080/api/posts/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.warn("Posts data is not an array:", data);
          setPosts([]);
        }
      });
  }, [userId]);
  

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id || post._id} // Use _id if using MongoDB
            style={{
              borderBottom: '1px solid #ccc',
              marginBottom: '10px',
              paddingBottom: '10px',
            }}
          >
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>
              Posted on:{' '}
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : 'Unknown date'}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
