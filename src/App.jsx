import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SolarApp from './pages/SolarApp';
import GameSelection from './pages/GameSelection';
import Game from './pages/Game';
import GameScore from './pages/GameScore';
import LeaderBoardSolar from './pages/LeaderBoardSolar';
// import LeaderBoard from './pages/LeaderBoard';

// Route guard component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const playerName = localStorage.getItem('playerName');
    const phone = localStorage.getItem('phone');
    
    // If user is not registered and trying to access any page other than registration
    if ((!playerName || !phone) && location.pathname !== '/') {
      navigate('/');
    }
  }, [navigate, location]);

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SolarApp />} />
        <Route path="/game-selection" element={
          <ProtectedRoute>
            <GameSelection />
          </ProtectedRoute>
        } />
        <Route path="/game" element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        } />
        <Route path="/score/:score" element={
          <ProtectedRoute>
            <GameScore />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={<LeaderBoardSolar />} />
      </Routes>
    </Router>
  );
}

export default App;
