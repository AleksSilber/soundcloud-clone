import './App.css';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js';
import LikePage from './pages/LikesPage.js';
import FeedPage from './pages/FeedPage.js';
function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<HomePage  />}/>
      <Route path='likes' element={<LikePage />} />
      <Route path='feed' element={<FeedPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
