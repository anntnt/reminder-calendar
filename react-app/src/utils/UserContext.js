import { createContext, useContext, useState, useEffect } from 'react';
import API from './api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get('/auth-check.php', { withCredentials: true });
        if (res.data.authenticated) {
          setIsLoggedIn(true);
          setUserName(res.data.name);
          setUserEmail(res.data.email);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, userName, userEmail, setIsLoggedIn, setUserName, setUserEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
