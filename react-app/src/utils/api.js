import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 🔑 Send cookies (including HttpOnly) with every request
});

// When using HttpOnly cookies, browser handles it automatically
export default API;
