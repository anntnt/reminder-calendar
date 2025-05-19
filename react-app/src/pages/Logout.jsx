import { useEffect } from 'react';
import { useUser } from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api'; 

const Logout = () => {
    const { setIsLoggedIn, setUserName, setUserEmail } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await API.post('logout.php');
        const data = res.data;
        if (!data.authenticated) {
          setIsLoggedIn(false);
          setUserName(null);
          setUserEmail(null);          
          navigate('/login');
        }
      } catch {
        navigate('/login');
      }
    };
    logout();
  }, []);

}
export default Logout;
