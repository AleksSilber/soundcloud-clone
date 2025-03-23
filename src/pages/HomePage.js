import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import SongSlider from "../components/SongSlider.jsx";
import PlaylistSlider from "../components/PlaylistSlider.jsx";
function HomePage() {
  return (
    <div className="d-flex mt-5 pt-5">
      <Sidebar></Sidebar>
      <div className='d-block ms-5'>
        <SongSlider></SongSlider>
        <PlaylistSlider></PlaylistSlider>
      </div>
    </div>
  );
}

export default HomePage;