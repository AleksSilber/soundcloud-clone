import './App.css';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import SongSlider from './components/SongSlider.jsx';
import PlaylistSlider from './components/PlaylistSlider.jsx';
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="d-flex pt-5">
        <Sidebar></Sidebar>
        <div className='d-block'>
        <SongSlider></SongSlider>
        <PlaylistSlider></PlaylistSlider>
        </div>
      </div>
    </div>
  );
}

export default App;
