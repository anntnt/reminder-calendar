import { NavLink } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarLeft = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('auth_token');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    navigate('/logout'); // This will trigger the logout logic and redirect
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