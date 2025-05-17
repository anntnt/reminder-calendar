import React, { useState } from 'react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Main from './components/Main';
import Footer from './components/Footer';
import Header from './components/Header';


function App() {
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const onToggleLeftSidebar = () => setShowLeftSidebar(!showLeftSidebar);

  return (
    <>

      <Header onToggleLeftSidebar={onToggleLeftSidebar} />

      <div className="container-fluid">
        <div className="row">
          {/* Left Sidebar with conditional display */}
          <div className={`col-md-2 p-0 bg-light ${showLeftSidebar ? '' : 'd-none d-md-block'}`}>
            <SidebarLeft />
          </div>

          {/* Main content */}
          <div className="col-md-8 d-flex flex-column">
            <Main />
          </div>

          {/* Right Sidebar */}
          <div className="col-md-2 p-0 bg-light">
            <SidebarRight />
          </div>
        </div>
      </div>

      {/* Footer (outside main column) */}
      <Footer />
    </>
  );
}

export default App;
