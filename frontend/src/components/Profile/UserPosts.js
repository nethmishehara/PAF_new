import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../services/api';
import './UserPost.css';

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(userId).then((res) => setPosts(res.data));
  }, [userId]);

  return (
    <div className="user-posts">
      <h3 className="section-title">Skill-Sharing Posts</h3>
      {posts.length === 0 ? (
        <p className="no-posts">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <p className="post-content">{post.content}</p>
            <span className="post-date">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPosts;
