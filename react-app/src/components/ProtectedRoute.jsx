import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import API from '../utils/api';

const ProtectedRoute = ({ children }) => {
  const location = useLocation(); // 🔹 Place this at the top inside your component
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get('/api/check', { withCredentials: true });
        if (res.data.authenticated) {
          setIsLoggedIn(true);
          setUserName(res.data.name);
          setUserEmail(res.data.email);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]); // 🔹 Runs every time the route changes

  if (isLoading) return null; 
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Pass userName/email to children
  return React.cloneElement(children, { userName, userEmail });
};

export default ProtectedRoute;
