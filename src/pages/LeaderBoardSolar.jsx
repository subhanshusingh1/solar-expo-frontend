import React, { useState, useEffect } from 'react';
import { Trophy, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const LeaderBoardSolar = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScores = async () => {
            try {
                console.log('Fetching leaderboard data...');
                const response = await axios.get(API_ENDPOINTS.leaderboard);
                console.log('Raw response:', response);
                console.log('Leaderboard data:', response.data);
                
                if (Array.isArray(response.data)) {
                    setScores(response.data);
                    console.log('Scores set to state:', response.data);
                } else {
                    console.error('Response data is not an array:', response.data);
                    setError('Invalid data format received');
                }
            } catch (err) {
                console.error('Error fetching leaderboard:', err);
                setError(err.message || 'Failed to load leaderboard');
            } finally {
                setLoading(false);
                console.log('Loading set to false');
            }
        };

        fetchScores();
    }, []);

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col items-center mb-8">
                        <div className="flex items-center mb-4">
                            <Trophy className="w-12 h-12 text-yellow-500 mr-4" />
                            <h1 className="text-3xl font-bold text-green-600">Top Scores</h1>
                        </div>
                        <button
                            onClick={handleHomeClick}
                            className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Take Me Home
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                            <p className="text-green-600">Loading scores...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-4">
                            <p>{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : scores.length === 0 ? (
                        <div className="text-center text-gray-600 py-4">
                            No scores yet. Be the first to play!
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-green-50">
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-green-600">Rank</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-green-600">Player</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-green-600">Score</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-green-600">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {scores.map((score, index) => (
                                        <tr 
                                            key={index}
                                            className={`${
                                                index < 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'
                                            } transition-colors`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className={`font-semibold ${
                                                        index === 0 ? 'text-yellow-500' :
                                                        index === 1 ? 'text-gray-400' :
                                                        index === 2 ? 'text-yellow-700' :
                                                        'text-gray-600'
                                                    }`}>
                                                        {index + 1}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {score.playerName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                                                {score.score}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(score.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeaderBoardSolar;