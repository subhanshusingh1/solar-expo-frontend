import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from './config/api'; // Adjust the 

const GameScore = () => {
    const { score } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const playerName = localStorage.getItem('playerName') || '';
    const phone = localStorage.getItem('phone') || '';

    // Determine game type from the previous path
    const gameType = location.state?.gameType || 'SolarJump';

    useEffect(() => {        
        const submitScore = async () => {
            try {
                if (phone && score) {
                    console.log('Submitting score:', { phone, score, gameType });
        
                    await axios.post(API_ENDPOINTS.saveScore, {
                        phone,
                        score: parseInt(score, 10), // Ensure the score is converted to an integer
                        gameType,
                    });
        
                    console.log('Score submitted successfully');
                }
            } catch (error) {
                console.error('Error submitting score:', error);
            }
        };
        

        submitScore();
    }, [score, phone, gameType]);

    const handleViewLeaderboard = () => {
        navigate('/leaderboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
            <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6 animate-scaleIn">
                <div className="text-center space-y-6">
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" />
                    <h2 className="text-3xl font-bold text-green-600 animate-slideDown">
                        Great Job, {playerName}!
                    </h2>
                    <div className="text-6xl font-bold text-green-600 animate-slideUp">
                        {score}
                    </div>
                    <p className="text-gray-600">Points Earned in {gameType}</p>
                    <button
                        onClick={handleViewLeaderboard}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-all hover:scale-105 animate-fadeIn"
                    >
                        View Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameScore;