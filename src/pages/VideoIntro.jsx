import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoIntro = ({ onVideoEnd }) => {
    const videoRef = useRef(null);
    const [videoError, setVideoError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const video = videoRef.current;
        
        if (video) {
            // Add event listener for when video ends
            video.addEventListener('ended', onVideoEnd);
            
            // Attempt to autoplay
            video.play().catch(error => {
                console.error('Video autoplay failed:', error);
                setVideoError(true);
            });
        }

        // Cleanup
        return () => {
            if (video) {
                video.removeEventListener('ended', onVideoEnd);
            }
        };
    }, [onVideoEnd]);

    const handlePlayClick = () => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(error => {
                console.error('Video play failed:', error);
                setVideoError(true);
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto p-4">
                <video
                    ref={videoRef}
                    className="w-full rounded-lg shadow-lg"
                    playsInline
                    autoPlay
                    muted
                    controls={false}
                    onError={(e) => {
                        console.error('Video error:', e);
                        setVideoError(true);
                    }}
                >
                    <source src="../../public/assest/Yo-Greens.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {videoError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <button
                            onClick={handlePlayClick}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Play Video
                        </button>
                    </div>
                )}

                <button
                    onClick={onVideoEnd}
                    className="absolute top-6 right-6 text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Skip Video
                </button>
            </div>
        </div>
    );
};

export default VideoIntro;
