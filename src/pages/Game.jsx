import React, { useState, useEffect, useCallback } from 'react';
import { Sun } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AnimatedScore = ({ score }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div className={`transition-transform duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
            {score}
        </div>
    );
};

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gameType = location.state?.gameType;
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isActive, setIsActive] = useState(true);
    const [particles, setParticles] = useState([]);
    const [isPanelGlowing, setIsPanelGlowing] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    useEffect(() => {
        if (!gameType) {
            navigate('/game-selection');  // Redirect if no game type
            return;
        }
    }, [gameType, navigate]);

    const handleGameEnd = useCallback(() => {
        if (gameEnded) return; // Prevent multiple endings
        setGameEnded(true);
        setIsActive(false);
        // Navigate to score page with the final score and game type
        navigate(`/score/${score}`, { state: { gameType } });
    }, [score, navigate, gameEnded, gameType]);

    useEffect(() => {
        if (timeLeft <= 0 && !gameEnded) {
            handleGameEnd();
        }
    }, [timeLeft, handleGameEnd, gameEnded]);

    useEffect(() => {
        let timer;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isActive, timeLeft]);

    const createParticle = useCallback((x, y) => {
        return {
            id: Math.random(),
            x,
            y,
            angle: Math.random() * Math.PI * 2,
            speed: 2 + Math.random() * 2,
            life: 1
        };
    }, []);

    const handleTap = useCallback((e) => {
        if (!isActive || gameEnded) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setScore(prev => prev + 1);
        setIsPanelGlowing(true);

        const newParticles = Array.from({ length: 8 }, () => createParticle(x, y));
        setParticles(prev => [...prev, ...newParticles]);

        setTimeout(() => setIsPanelGlowing(false), 150);
    }, [isActive, gameEnded, createParticle]);

    useEffect(() => {
        if (particles.length === 0) return;

        const animationFrame = requestAnimationFrame(() => {
            setParticles(prev => prev
                .map(particle => ({
                    ...particle,
                    x: particle.x + Math.cos(particle.angle) * particle.speed,
                    y: particle.y + Math.sin(particle.angle) * particle.speed,
                    life: particle.life - 0.02
                }))
                .filter(particle => particle.life > 0)
            );
        });

        return () => cancelAnimationFrame(animationFrame);
    }, [particles]);

    const playerName = localStorage.getItem('playerName') || '';

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
            <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6 overflow-hidden">
                <div className="relative">
                    <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
                        {playerName ? `${playerName}, Tap the Solar Panel!` : 'Tap the Solar Panel!'}
                    </h2>

                    <div className="absolute top-0 right-0 w-20 h-20 flex items-center justify-center">
                        <div className="relative w-16 h-16">
                            <div className={`absolute inset-0 bg-yellow-400 rounded-full transition-transform duration-1000 ${
                                timeLeft <= 10 ? 'animate-ping opacity-50' : ''
                            }`} />
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
                                {timeLeft}
                            </div>
                        </div>
                    </div>

                    <div className="text-xl text-center mb-8">
                        Score: <AnimatedScore score={score} />
                    </div>

                    <div
                        className="relative mx-auto w-48 h-48 cursor-pointer"
                        onClick={handleTap}
                    >
                        <button
                            className={`w-full h-full rounded-xl transition-all duration-300 transform ${
                                isPanelGlowing ? 'bg-yellow-300 scale-105' : 'bg-yellow-100'
                            } ${!isActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102'}`}
                            disabled={!isActive || gameEnded}
                        >
                            <Sun
                                className={`w-full h-full p-8 text-green-600 transition-transform ${
                                    isPanelGlowing ? 'rotate-45' : ''
                                }`}
                            />
                        </button>

                        {particles.map(particle => (
                            <div
                                key={particle.id}
                                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                                style={{
                                    left: particle.x,
                                    top: particle.y,
                                    opacity: particle.life,
                                    transform: `scale(${particle.life})`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
