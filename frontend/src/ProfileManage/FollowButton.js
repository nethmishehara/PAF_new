import React, { useState, useEffect } from 'react';

const FollowButton = ({ profileUserId }) => {
  const currentUserId = 'user123'; // Replace with session user ID logic
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionPending, setActionPending] = useState(false);

  useEffect(() => {
    if (!currentUserId || !profileUserId) {
      console.warn("User IDs are not properly set.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/users/${currentUserId}/following`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch following list.");
        return res.json();
      })
      .then((following) => {
        if (Array.isArray(following)) {
          setIsFollowing(following.includes(profileUserId));
        } else {
          console.error("Expected an array but got:", following);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching following list:", error);
        setLoading(false);
      });
  }, [profileUserId, currentUserId]);

  const handleFollowToggle = () => {
    if (actionPending || !profileUserId || !currentUserId) return;

    setActionPending(true);

    fetch(`http://localhost:8080/api/users/${currentUserId}/follow/${profileUserId}`, {
      method: isFollowing ? 'DELETE' : 'POST',
    })
      .then((res) => {
        if (res.ok) {
          setIsFollowing(!isFollowing);
        } else {
          console.error("Failed to toggle follow status.");
        }
      })
      .catch((error) => {
        console.error("Error toggling follow status:", error);
      })
      .finally(() => {
        setActionPending(false);
      });
  };

  if (loading) return <button disabled>Loading...</button>;

  return (
    <button onClick={handleFollowToggle} disabled={actionPending}>
      {actionPending ? 'Updating...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
