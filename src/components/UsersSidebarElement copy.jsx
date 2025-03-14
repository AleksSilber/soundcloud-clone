import React, { useEffect, useState } from "react";

function UsersSidebarElement() {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [previousUsers, setPreviousUsers] = useState([]);

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

  return (
    <li>
      <a className="pe-5">Artists you should follow</a>
      <a href="#" onClick={refreshUsers}>Refresh list</a>
      <ul className="list-unstyled">
        {users.map((user, index) => (
          <li key={index} className="">
            <img 
              src={user.profilePicture} 
              alt="User" 
              className="rounded-circle d-inline img-fluid col-2 my-2 me-2" 
            />
            <p className="d-inline">{user.username}</p>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default UsersSidebarElement;

