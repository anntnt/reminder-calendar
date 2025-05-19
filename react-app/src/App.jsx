// App.jsx
import React, { useState, useEffect } from 'react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Main from './components/Main';
import Footer from './components/Footer';
import Header from './components/Header';
import API from './utils/api';

function App() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const onToggleLeftSidebar = () => setShowLeftSidebar(!showLeftSidebar);

  const checkAuth = async () => {
    try {
      const res = await API.get('/auth-check.php', { withCredentials: true });
      setIsLoggedIn(res.data.authenticated);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Header onToggleLeftSidebar={onToggleLeftSidebar} />

      <div className="container-fluid">
        <div className="row">
          {/* Left Sidebar */}
          <div className={`col-md-2 p-0 bg-light ${showLeftSidebar ? '' : 'd-none d-md-block'}`}>
            <SidebarLeft isLoggedIn={isLoggedIn} />
          </div>

          {/* Main content */}
          <div className="col-md-8 d-flex flex-column">
            <Main
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>

          {/* Right Sidebar */}
          <div className="col-md-2 p-0 bg-light">
            <SidebarRight />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
