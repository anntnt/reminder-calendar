import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../utils/api';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await API.post('/register.php', form);
      navigate('/login'); // ⬅ redirect immediately to login
    } catch (err) {
      const msg = err.response?.data?.error || 'Registrierung fehlgeschlagen.';
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div>
          <label>Passwort:</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Registrieren</button>
      </form>
    </div>
  );
};

export default RegisterForm;
