import React, { useState } from 'react';
import axios from 'axios';
import './CSS/PasswordReset.css'; // Create styling as needed
import {useNavigate} from 'react-router-dom'
const API_URL = import.meta.env.VITE_BACKEND_URL;
const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const {data} = await axios.post(`${API_URL}/forget-password`,{ email });

      console.log("Reset password from PasswordReset.jsx ",data.resetToken);
      if(data.status==='success')
      {
        localStorage.setItem('resetToken', data.resetToken);
        navigate('/reset-password',{ state: { resetToken: data.resetToken } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleReset} className="reset-form">
        <h2>Reset Your Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default PasswordReset;
