import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost/reminder-calendar/public',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 🔑 Send cookies (including HttpOnly) with every request
});
// When using HttpOnly cookies, browser handles it automatically
export default API;
