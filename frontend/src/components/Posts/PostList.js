// PostList.js
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import PostItem from './PostItem';

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Failed to fetch posts:', err)); 
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} userId={userId} />
      ))}
    </div>
  );
};

export default PostList; // Ensure you have the correct export here
