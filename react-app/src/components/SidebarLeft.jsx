import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import API from '../utils/api'; 

const SidebarLeft = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get('/auth-check.php');
        setIsLoggedIn(res.data.authenticated);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <aside className="sidebar-responsive overflow-auto p-3">
      <ul className="nav flex-column small">
        <li className="nav-item">
          <NavLink className="nav-link" to="/" end>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">
            Über uns
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/appointments">
            Termine
          </NavLink>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register" end>
                Registrieren
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" end>
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default SidebarLeft;
