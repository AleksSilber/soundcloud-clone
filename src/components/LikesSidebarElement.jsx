import React, { useEffect, useState } from "react";

function LikesSidebarElement({ userId }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const usersRes = await fetch("http://localhost:5001/users");
        const usersData = await usersRes.json();
        setUsers(usersData);

        const likesResponse = await fetch("http://localhost:5001/likes");
        const likesData = await likesResponse.json();
        
        const userLikes = likesData
          .filter(like => like.userId === userId)
          .slice(-3)
          .reverse();

        const songsResponse = await fetch("http://localhost:5001/songs");
        const songsData = await songsResponse.json();

        const likedTracks = userLikes.map(like =>
          songsData.find(song => song.id === like.trackId)
        ).filter(song => song);

        setLikedSongs(likedTracks);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    fetchLikedSongs();
  }, [userId]);

  function truncateTitle(title) {
    return title.length > 30? title.slice(0, 30) + "..." : title;
  }

  return (
    <li className="mt-5">
      <a className="pe-5">Recently Liked Songs</a>
      <a href="/likes" className="ps-5">View all</a>
      <hr className="w-75 border opacity-25" />
      <ul className="list-unstyled">
        {likedSongs.map((song, index) => {
           const user = users.find((u) => u.id === song.userId);
           return(
          <li key={index}>
            <div className="d-inline-flex align-items-center">
            <img 
              src={song.coverImage} 
              alt="Cover" 
              className="d-inline img-fluid my-2 me-2" 
              style={{width: "50px", height: "50px"}}
            />
            <div className="d-flex flex-column mt-2">
            <small>{user.username}</small>
            <p className="d-inline">{truncateTitle(song.title)}</p>
            </div>
            </div>
          </li>
          )})}
      </ul>
    </li>
  );
}

export default LikesSidebarElement;

