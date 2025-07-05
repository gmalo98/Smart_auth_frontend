import React, { useState } from 'react';
import './CSS/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/authSlice'; // ✅ make sure path is correct
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BACKEND_URL; // ✅ must be defined in .env file

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [showPassword, setShowPassword] = useState(false);
  const [logindata, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_URL}/login`, logindata, {
        withCredentials: true,
      });

      if (data.status === 'success') {
        const user = data.data.user;
        dispatch(setAuthUser(user)); // ✅ store in redux & localStorage
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Login Failed!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={logindata.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
        </div>

        
    <div className="input-group">
                        <label className="section-title">Password</label>
                        <div className="input-group password-input">
                          <input
                            type={showPassword ? "text" : "password"}
                 name="password"
            required
            value={logindata.password}
            placeholder="Enter your password"
            onChange={handleInputChange}
                          />
                          <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ?<FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>
        <li style={{paddingBottom:"10px",cursor:"pointer",listStyle:"none"}}>

        <a href="/forget-password">Forget password ?</a>
        </li>
        <button type="submit" className="login-button">Log In</button>

        <li className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </li>
      </form>
    </div>
  );
};

export default Login;
