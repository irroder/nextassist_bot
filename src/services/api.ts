import axios from 'axios';

// Replace with your actual API URL
const API_URL = 'https://api.teamboard.example.com';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to include Telegram auth data with every request
api.interceptors.request.use(config => {
  const tg = window.Telegram?.WebApp;
  if (tg && tg.initData) {
    config.headers['X-Telegram-Data'] = tg.initData;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      console.error('Authentication error:', error);
    }
    return Promise.reject(error);
  }
);