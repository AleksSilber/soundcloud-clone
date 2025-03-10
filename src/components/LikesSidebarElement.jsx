import React, { useEffect, useState } from "react";

function LikesSidebarElement({ userId }) {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
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

  return (
    <li>
      <a className="pe-5">Recently Liked Songs</a>
      <ul className="list-unstyled">
        {likedSongs.map((song, index) => (
          <li key={index}>
            <img 
              src={song.coverImage} 
              alt="Cover" 
              className="d-inline img-fluid col-1 my-2 me-2" 
            />
            <p className="d-inline">{song.title}</p>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default LikesSidebarElement;

