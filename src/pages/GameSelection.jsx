import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Wind, Info } from 'lucide-react';

const GameSelection = () => {
    const navigate = useNavigate();
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameCode, setGameCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [showInstructions, setShowInstructions] = useState(true);

    useEffect(() => {
        const storedName = localStorage.getItem('playerName');
        if (!storedName) {
            navigate('/');
            return;
        }
        setPlayerName(storedName);
    }, [navigate]);

    const handleGameClick = (game) => {
        setSelectedGame(game);
        if (game === 'solarTap') {
            navigate('/game', { state: { gameType: game } });
            return;
        }
        setShowInstructions(true);
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        setCodeError('');

        // Check if code matches the format Score-Game123
        const codePattern = /^(\d+)-Game\d{3}$/;
        const match = gameCode.match(codePattern);
        
        if (!match) {
            setCodeError('Invalid code format. Please use format: [Score]-Game123');
            return;
        }

        // Extract score as integer
        const score = parseInt(match[1], 10);
        if (isNaN(score)) {
            setCodeError('Score must be a valid number');
            return;
        }

        const phone = localStorage.getItem('phone');
        if (!phone) {
            setCodeError('Please register first');
            return;
        }

        // Navigate to score page with the selected game type
        navigate(`/score/${score}`, { 
            state: { 
                gameType: selectedGame 
            } 
        });
    };

    const handleBack = () => {
        setSelectedGame(null);
        setGameCode('');
        setCodeError('');
        setShowInstructions(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {!selectedGame ? (
                    <>
                        <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
                            Welcome {playerName}! Choose Your Game
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Solar Tap Game */}
                            <div 
                                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => handleGameClick('solarTap')}
                            >
                                <div className="text-center space-y-4">
                                    <Sun className="w-16 h-16 text-yellow-500 mx-auto" />
                                    <h2 className="text-2xl font-bold text-green-600">Solar Tap</h2>
                                    <p className="text-gray-600">Test your tapping speed in this solar-powered challenge!</p>
                                    <button
                                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Play Now
                                    </button>
                                </div>
                            </div>

                            {/* Solar Jump Game */}
                            <div 
                                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => handleGameClick('solarJump')}
                            >
                                <div className="text-center space-y-4">
                                    <Wind className="w-16 h-16 text-yellow-500 mx-auto" />
                                    <h2 className="text-2xl font-bold text-green-600">Solar Jump</h2>
                                    <p className="text-gray-600">Jump and collect solar energy in this exciting platformer!</p>
                                    <button
                                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Play Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : selectedGame === 'solarJump' ? (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-green-600 mb-2">Welcome {playerName}!</h2>
                                <p className="text-gray-600">Catch as many suns as possible to generate solar energy!</p>
                            </div>
                            <button
                                onClick={handleBack}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                ← Back to Games
                            </button>
                        </div>

                        {/* Game Instructions Overlay */}
                        {showInstructions && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                <div className="bg-white rounded-lg p-6 max-w-md">
                                    <div className="flex items-center justify-center mb-4">
                                        <Info className="w-8 h-8 text-green-600 mr-2" />
                                        <h3 className="text-xl font-bold text-green-600">How to Play</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-gray-600">1. Tap on screen to make character jump and collect suns</p>
                                        <p className="text-gray-600">2. After completing the game, you'll receive a unique code</p>
                                        <p className="text-gray-600">3. Enter that code below the game to submit your score</p>
                                        <p className="text-gray-600">4. Check the leaderboard to see how you rank!</p>
                                    </div>
                                    <button
                                        onClick={() => setShowInstructions(false)}
                                        className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Got it!
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col items-center space-y-6">
                            {/* Responsive iframe container */}
                            <div className="w-full max-w-3xl aspect-[485/402] relative">
                                <iframe 
                                    src="https://scratch.mit.edu/projects/1113936471/embed" 
                                    allowTransparency="true"
                                    frameBorder="0" 
                                    scrolling="no" 
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                />
                            </div>

                            

                            <form onSubmit={handleCodeSubmit} className="w-full max-w-md space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        value={gameCode}
                                        onChange={(e) => setGameCode(e.target.value)}
                                        placeholder="Enter code: Score-Game123"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    {codeError && (
                                        <p className="text-red-500 text-sm mt-1">{codeError}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Submit Score
                                </button>
                            </form>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default GameSelection;
