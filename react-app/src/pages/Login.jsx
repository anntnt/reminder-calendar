import React from 'react';
import LoginForm from '../components/LoginForm';


function Login({ setIsLoggedIn }) {
  return (
    <div className="container py-4">
      <div className="row align-items-center">
        <div className="col-md-12">
          <h1 className="display-5 fw-bold mb-3">Login zum Terminplaner</h1>

          <div className="border rounded p-4 mb-4 bg-light">
            <LoginForm setIsLoggedIn={setIsLoggedIn}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
