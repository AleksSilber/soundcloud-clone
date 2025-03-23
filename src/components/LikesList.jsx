
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function LikeList({userId}) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    async function fetchData() {
      try {
        const usersRes = await fetch("http://localhost:5001/users");
        const usersData = await usersRes.json();
        setUsers(usersData);

        const likesRes = await fetch("http://localhost:5001/likes");
        const likesData = await likesRes.json();
        
        const userLikes = likesData.filter(like => like.userId === userId);

        const songsRes = await fetch("http://localhost:5001/songs");
        const songsData = await songsRes.json();

        const likedSongs = userLikes.map(like =>
          songsData.find(song => song.id === like.trackId)
        ).filter(song => song !== undefined)
        .reverse();

        setLikedSongs(likedSongs);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    }

    fetchData();
  }, [userId]);

  function truncateTitle(title) {
    return title.length > 19 ? title.slice(0, 19) + "..." : title;
  }
  return (
    <div className="container">
      <h5 className="my-4 ms-5 ps-3 opacity-50">Hear the tracks you’ve liked:</h5>
      <div className="row mx-5">
        {likedSongs.length > 0 ? (
          likedSongs.map((song, index) => {
            const user = users.find((u) => u.id === song.userId);
            return(
            <div className="col-2 my-4" key={song.id}>
              <div className="">
                <img src={song.coverImage} className="card-img-top" alt={song.title} />
                <div className="card-body d-flex flex-column">
                  <span className="card-title">{truncateTitle(song.title)}</span>
                  <small className="opacity-50">{user.username}</small>
                </div>
              </div>
            </div>
          )})
        ) : (
          <p>No liked songs found.</p>
        )}
      </div>
    </div>
  );
}

export default LikeList;