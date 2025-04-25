import React, { useState, useEffect } from 'react';
import { likePost } from '../../services/api';
import CommentSection from './CommentSection';
import './PostItem.css'; // Optional: CSS file for styling

const PostItem = ({ post, userId }) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (post?.likes && Array.isArray(post.likes)) {
      setLikes(post.likes.length);
      setHasLiked(post.likes.includes(userId)); // Check if current user has already liked
    }
  }, [post, userId]);

  const handleLike = async () => {
    try {
      const response = await likePost(post.id, userId);
      const updatedLikes = response.data?.likes ?? [];
      setLikes(updatedLikes.length);
      setHasLiked(updatedLikes.includes(userId));
    } catch (error) {
      console.error('Failed to like the post:', error);
    }
  };

  return (
    <div className="post-item">
      <div className="post-content">
        <p>{post?.content || "No content available."}</p>
      </div>

      <div className="post-actions">
        <button className={`like-btn ${hasLiked ? 'liked' : ''}`} onClick={handleLike}>
          {hasLiked ? 'Unlike' : 'Like'} ({likes})
        </button>
      </div>

      <CommentSection postId={post.id} userId={userId} />
    </div>
  );
};

export default PostItem;
