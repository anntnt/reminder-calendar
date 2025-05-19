import React, { useState } from 'react';
import { useUser } from '../utils/UserContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const LoginForm = () => {
  const { setIsLoggedIn, setUserName, setUserEmail } = useUser();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('login.php', form);
      const data = res.data;
      
      if (data.authenticated) {
        setIsLoggedIn(true);
        setUserName(data.name);
        setUserEmail(data.email);
        navigate('/appointments');
      } else {
        setError('Login fehlgeschlagen.');
      }
      
    } catch (err) {
      const msg = err.response?.data?.error || 'Login fehlgeschlagen.';
      console.error('Login error:', msg);
      console.error('Error details:', err);
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
