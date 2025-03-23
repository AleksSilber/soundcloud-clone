import React, { useEffect, useState } from "react";

function PlaylistSlider() {
  const [playlists, setPlaylists] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPlaylists= async () => {
      try {
        const response = await fetch("http://localhost:5001/playlists");
        let data = await response.json();
        data = shuffleArray(data).slice(0, 12);
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function truncateName(name) {
    return name.length > 13 ? name.slice(0, 13) + "..." : name;
  }

  const nextpPlaylists = () => {
    if (currentIndex + 4 < playlists.length) {
      setCurrentIndex((prevIndex) => prevIndex + 4);
    }
  };

  const prevPlaylists = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 4);
    }
  };

  const displayedPlaylists = playlists.slice(currentIndex, currentIndex + 4);

  return (
    <div id="carouselExample" className="carousel slide col-md-7 mx-5 px-5">
        <h4 className="ps-0 mb-4">Playlists made for you</h4>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row g-3">
            {displayedPlaylists.map((playlist, index) => (
              <div key={index} className="col-md-3">
                <div>
                  <img
                    src={playlist.coverImage}
                    className="card-img-top img-fluid"
                    alt="Song Cover"
                  />
                  <div className="card-body">
                    <p className="card-text">{truncateName(playlist.name)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button 
        className="carousel-control-prev h-75 mt-5" 
        type="button" 
        onClick={prevPlaylists} 
        disabled={currentIndex === 0}
        hidden = {currentIndex === 0}
      >
        <span className="carousel-control-prev-icon bg-black rounded-1" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button 
        className="carousel-control-next h-75 mt-5" 
        type="button" 
        onClick={nextpPlaylists} 
        disabled={currentIndex + 4 >= playlists.length}
        hidden ={currentIndex + 4 >= playlists.length}
      >
        <span className="carousel-control-next-icon bg-black rounded-1" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <hr className="mt-5 opacity-25 border"/>
    </div>
  );
}

export default PlaylistSlider;
