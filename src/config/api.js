const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/register`,
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
  saveScore: `${API_BASE_URL}/api/scores`
};

export default API_BASE_URL;
