import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost/reminder-calendar/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add token to all requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default API;
