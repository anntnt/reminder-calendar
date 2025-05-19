import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Appointments from '../pages/Appointments';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import ProtectedRoute from './ProtectedRoute';

const Main = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');

  return (
    <main className="col px-4 py-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login 
                                        setIsLoggedIn={setIsLoggedIn} 
                                        setUserName={setUserName}
                                        setUserEmail={setUserEmail}/>} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Appointments               
              userName={userName}
              userEmail={userEmail}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
