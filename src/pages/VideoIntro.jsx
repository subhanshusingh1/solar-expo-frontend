import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoIntro = ({ onVideoEnd }) => {
    const videoRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const video = videoRef.current;
        
        if (video) {
            // Add event listener for when video ends
            video.addEventListener('ended', onVideoEnd);
            
            // Attempt to autoplay
            video.play().catch(error => {
                console.error('Video autoplay failed:', error);
                // If autoplay fails, show a play button
            });
        }

        // Cleanup
        return () => {
            if (video) {
                video.removeEventListener('ended', onVideoEnd);
            }
        };
    }, [onVideoEnd]);

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto">
                <video
                    ref={videoRef}
                    className="w-full"
                    playsInline
                    autoPlay
                    muted
                >
                    <source src="/assets/Yo-Green.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                    onClick={() => onVideoEnd()}
                    className="absolute top-4 right-4 text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default VideoIntro;
