import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/** --------------------- User APIs --------------------- **/
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const getAllUsers = () => api.get('/users');

/** --------------------- Course Recommendation APIs --------------------- **/
export const getRecommendedCourses = (userId) => api.get(`/recommendations/${userId}`); // fixed path
export const getRecommendedCoursesBySkills = (userId) => api.get(`/recommendations/${userId}`); // alias if needed

/** --------------------- Post APIs --------------------- **/
export const fetchPosts = () => api.get('/posts');
export const createPost = (postData) => api.post('/posts', postData);
export const likePost = (postId, userId) =>
  api.post(`/posts/${postId}/like`, null, {
    params: { userId },
  });
export const getUserPosts = (userId) => api.get(`/posts/user/${userId}`); // added

/** --------------------- Comment APIs --------------------- **/
export const addComment = (commentData) => api.post('/comments', commentData);
export const editComment = (commentId, newText) =>
  api.put(`/comments/${commentId}`, null, {
    params: { newText },
  });
export const deleteComment = (commentId, userId) =>
  api.delete(`/comments/${commentId}`, {
    params: { userId },
  });
export const deleteCommentAsPostOwner = (commentId, postOwnerId) =>
  api.delete(`/comments/post-owner/${commentId}`, {
    params: { postOwnerId },
  });

/** --------------------- Notification APIs --------------------- **/
export const fetchNotifications = (userId) => api.get(`/notifications/${userId}`);
export const markNotificationsAsRead = (userId) => api.post(`/notifications/${userId}/mark-read`);

export default api;
