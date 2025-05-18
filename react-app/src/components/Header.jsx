import React from 'react';
import Image from 'react-bootstrap/Image';
import { NavLink} from 'react-router-dom';

function Header({ onToggleLeftSidebar }) {
  return (
    <header className="bd-header py-1   bg-white container-fluid">
      <div className="row align-items-center px-3">

        {/* Sidebar toggle button (mobile only) */}
        <div className="col-auto d-md-none">
          <button
            onClick={onToggleLeftSidebar}
            className="btn btn-outline-secondary"
          >
            ☰
          </button>
        </div>

        {/* Horizontal line (moved slightly down) */}
        <div className="col mt-2">
          <div className="border-top border-secondary w-100"></div>
        </div>

        {/* Logo (right-aligned with margin) */}
        <div className="col-auto me-5 me-lg-6 me-xl-6">
          <NavLink className="nav-link" to="/" end>
            <Image
              src="/images/reminder_logo.jpg"
              alt="Logo"
              className="img-fluid"
            />
          </NavLink>
        </div>

      </div>
    </header>
  );
}

export default Header;
