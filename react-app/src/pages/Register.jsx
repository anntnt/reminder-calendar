import React from 'react';
import RegisterForm from '../components/RegisterForm';


function Register() {
  return (
    <div className="container py-4">
      <div className="row align-items-center">
        <div className="col-md-12">
          <h1 className="display-5 fw-bold mb-3">Registrierung</h1>

          <div className="border rounded p-4 mb-4 bg-light">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
