import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import { useUser } from '../utils/UserContext';

const SidebarLeft = () => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  const linkClass = "btn btn-primary mb-2 rounded text-start py-2 px-3 px-lg-4 w-100";

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <aside className="sidebar-responsive overflow-auto p-3 w-100 w-sm-75 w-md-50 w-lg-25">
      <ul className="nav flex-column small">
        <li className="nav-item">
          <NavLink className={linkClass} to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={linkClass} to="/about">Über uns</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={linkClass} to="/appointments">Termine</NavLink>
        </li>

        {isLoggedIn ? (
          <li className="nav-item">
            <button className={linkClass} onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <NavLink className={linkClass} to="/register">Registrieren</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default SidebarLeft;
