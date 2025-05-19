import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
const SidebarLeft = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <aside className="sidebar-responsive overflow-auto p-3">
      <ul className="nav flex-column small">
        <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/about">Über uns</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/appointments">Termine</NavLink></li>

        {isLoggedIn ? (
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li className="nav-item"><NavLink className="nav-link" to="/register">Registrieren</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default SidebarLeft;