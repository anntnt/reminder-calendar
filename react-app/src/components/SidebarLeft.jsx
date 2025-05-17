import { NavLink } from 'react-router-dom';

const SidebarLeft = () => (
  <aside className="sidebar-responsive overflow-auto p-3">
    <ul className="nav flex-column small">
    <li className="nav-item">
        <NavLink className="nav-link" to="/register" end>
          Registrieren
        </NavLink>
      </li>      
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
    </ul>
  </aside>
);
export default SidebarLeft;