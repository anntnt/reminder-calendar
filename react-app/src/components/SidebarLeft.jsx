import { NavLink } from 'react-router-dom';

const SidebarLeft = () => (
  <aside className="sidebar-responsive overflow-auto p-3">
    <ul className="nav flex-column small">
    <li className="nav-item">
        <NavLink className="nav-link" to="/registrieren" end>
          Registrieren
        </NavLink>
      </li>      
      <li className="nav-item">
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/ueber_uns">
          Über uns
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/termine">
          Termine
        </NavLink>
      </li>
    </ul>
  </aside>
);
export default SidebarLeft;