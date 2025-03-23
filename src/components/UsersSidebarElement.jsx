import React, { useEffect, useState } from "react";

function UsersSidebarElement() {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [previousUsers, setPreviousUsers] = useState([]);
  const [following, setFollowing] = useState(new Set());
  const currentUserId = 1;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/users");
        let data = await response.json();

        setOriginalUsers(data);
        const newUsers = getNewUsers(data, []);
        setUsers(newUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await fetch("http://localhost:5001/followers");
        let data = await response.json();

        // Filter only users followed by the current user (id = 1)
        const followingSet = new Set(
          data
            .filter(follow => follow.followerId === currentUserId)
            .map(follow => follow.followingId)
        );
        setFollowing(followingSet);
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };

    fetchUsers();
    fetchFollowing();
  }, []);

  function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function getNewUsers(allUsers, prevUsers) {
    let availableUsers = allUsers.filter(user => !prevUsers.includes(user));
    if (availableUsers.length < 3) {
      availableUsers = allUsers;
    }
    return shuffleArray(availableUsers).slice(0, 3);
  }

  const refreshUsers = () => {
    const newUsers = getNewUsers(originalUsers, previousUsers);
    setPreviousUsers(users);
    setUsers(newUsers);
  };

  const toggleFollow = async (userId) => {
    if (following.has(userId)) {
      // Unfollow user
      try {
        await fetch(`http://localhost:5001/followers/${userId}`, {
          method: "DELETE",
        });
        setFollowing(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      } catch (error) {
        console.error("Error unfollowing user:", error);
      }
    } else {
      // Follow user
      try {
        await fetch(`http://localhost:5001/followers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        setFollowing(prev => new Set(prev).add(userId));
      } catch (error) {
        console.error("Error following user:", error);
      }
    }
  };

  return (
    <li>
      <a className="pe-5">Artists you should follow</a>
      <a href="#" onClick={refreshUsers}>Refresh list</a>
      <hr className="w-75 border opacity-25"/>
      <ul className="list-unstyled">
        {users.map((user) => (
          <li key={user.id} className="d-flex align-items-center">
            <img 
              src={user.profilePicture} 
              alt="User" 
              className="rounded-circle d-inline img-fluid col-2 my-2 me-2" 
            />
            <p className="d-inline me-2">{user.username}</p>
            {user.id !== currentUserId && ( // Prevent following yourself
              <button 
                className={`btn ${following.has(user.id) ? "btn-success" : "btn-outline-primary"}`} 
                onClick={() => toggleFollow(user.id)}
              >
                {following.has(user.id) ? "Following" : "Follow"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default UsersSidebarElement;
