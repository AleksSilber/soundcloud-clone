import React, { useEffect, useState } from "react";

function UsersSidebarElement() {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [previousUsers, setPreviousUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState(new Set()); // To track followed users
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/users");
        let data = await response.json();
        
        data = data.slice(1); // Assuming you want to skip the first user (ID 1)
        setOriginalUsers(data);
        const newUsers = getNewUsers(data, []);
        setUsers(newUsers);

        // Get followed users for the logged-in user (ID 1)
        const followsResponse = await fetch("http://localhost:5001/followers");
        const follows = await followsResponse.json();
        const followed = new Set(follows.filter(follow => follow.followerId === 1).map(follow => follow.followingId));
        setFollowedUsers(followed);

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
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

  const handleFollow = async (userId) => {
    try {
      const response = await fetch("http://localhost:5001/followers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followerId: 1, // Logged-in user
          followingId: userId,
        }),
      });

      if (response.ok) {
        setFollowedUsers(prev => new Set(prev.add(userId))); // Add user to followed set
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const response = await fetch("http://localhost:5001/followers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followerId: 1, // Logged-in user
          followingId: userId,
        }),
      });

      if (response.ok) {
        setFollowedUsers(prev => {
          const newFollowed = new Set(prev);
          newFollowed.delete(userId); // Remove user from followed set
          return newFollowed;
        });
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
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
            <button
              onClick={() => followedUsers.has(user.id) ? handleUnfollow(user.id) : handleFollow(user.id)}
              className="btn btn-primary"
            >
              {followedUsers.has(user.id) ? "Followed" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default UsersSidebarElement;
