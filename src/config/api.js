const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'https://solar-expo-frontend.vercel.app'
  }
};

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/users/register`,
  leaderboard: `${API_BASE_URL}/api/score/leaderboard`,
  saveScore: `${API_BASE_URL}/api/score/submit`
};

console.log('API Base URL:', API_BASE_URL);
console.log('API Config:', API_CONFIG);

export default API_BASE_URL;
