import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          'http://localhost/reminder-calendar/public/logout.php',
          {},
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        // Clear auth tokens from local storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');

        // Redirect only after successful logout
        navigate('/login');
      } catch (err) {
        console.error('Logout failed', err);
        // Optionally redirect anyway
        navigate('/login');
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="container">
      <h1 className="text-center">Logging out...</h1>
      <p className="text-center">Redirecting to the login page...</p>
    </div>
  );
};

export default Logout;
