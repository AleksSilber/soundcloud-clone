import React, { useEffect, useState } from "react";

function SongSlider() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:5001/songs");
        let data = await response.json();

        data = shuffleArray(data).slice(0, 20);
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function truncateTitle(title) {
    return title.length > 13 ? title.slice(0, 13) + "..." : title;
  }

  const nextSongs = () => {
    if (currentIndex + 4 < songs.length) {
      setCurrentIndex((prevIndex) => prevIndex + 4);
    }
  };

  const prevSongs = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 4);
    }
  };

  const displayedSongs = songs.slice(currentIndex, currentIndex + 4);

  return (
    <div id="carouselExample" className="carousel slide col-md-7 mx-5 px-5 pb-5">
        <h4 className="ps-0 mb-4">Songs you might like</h4>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row g-3">
            {displayedSongs.map((song, index) => (
              <div key={index} className="col-md-3">
                <div>
                  <img
                    src={song.coverImage}
                    className="img-fluid"
                    alt="Song Cover"
                  />
                  <div className="card-body">
                    <p className="card-text">{truncateTitle(song.title)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button 
        className="carousel-control-prev h-75 mt-4" 
        type="button" 
        onClick={prevSongs} 
        disabled={currentIndex === 0}
        hidden={currentIndex === 0}
      >
        <span className="carousel-control-prev-icon bg-black rounded-1" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button 
        className="carousel-control-next h-75 mt-4" 
        type="button" 
        onClick={nextSongs} 
        disabled={currentIndex + 4 >= songs.length}
        hidden ={currentIndex + 4 >= songs.length}
      >
        <span className="carousel-control-next-icon bg-black rounded-1" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <hr className="mt-5 opacity-25 border"/>
    </div>
    
  );
}

export default SongSlider;
