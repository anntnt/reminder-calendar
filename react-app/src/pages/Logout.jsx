import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api'; 

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await API.post('logout.php');
        setIsLoggedIn(false); // ✅ update auth state
        navigate('/login');
      } catch {
        navigate('/login');
      }
    };
    logout();
  }, []);

}
export default Logout;
