import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Appointments from '../pages/Appointments';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import ProtectedRoute from './ProtectedRoute';

const Main = () => {

  return (
    <main className="col px-4 py-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute >
              <Appointments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
