import React, { useEffect, useState } from 'react';
import { addComment, editComment, deleteComment } from '../../services/api';

const CommentSection = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch comments from backend if implemented
  }, []);

  const handleAddComment = () => {
    const comment = { postId, userId, text };
    addComment(comment).then((res) => {
      setComments([...comments, res.data]);
      setText('');
    });
  };

  const handleEditComment = (id) => {
    const newText = prompt('Edit your comment:');
    if (newText) {
      editComment(id, newText).then((res) => {
        setComments(comments.map((c) => (c.id === id ? res.data : c)));
      });
    }
  };

  const handleDeleteComment = (id) => {
    deleteComment(id, userId).then(() => {
      setComments(comments.filter((c) => c.id !== id));
    });
  };

  return (
    <div className="comment-section">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment" />
      <button onClick={handleAddComment}>Comment</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            {comment.userId === userId && (
              <>
                <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
