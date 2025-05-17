import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api'; 

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await API.post(
          'logout.php',{},
        );
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
