import React, { useState } from 'react';
import './CSS/ChangePassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_BACKEND_URL; // ✅ must be defined in .env file
const ChangePassword = () => {
    const location = useLocation();
  const resetToken = localStorage.getItem('resetToken');

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate=useNavigate();
  const passwordValid = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    minLength: password.length >= 8,
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
     toast.error("Passwords do not match!");
      return;
    }
    else{
        try{
            // const email = location.state?.email; // Get the email passed
      
             const res = await axios.post(`${API_URL}/reset-password`, {resetToken,otp,password,passwordConfirm},{withCredentials:true});
      
                  if(res.data.status==='success')
                  {

                    localStorage.removeItem('resetToken');

                     navigate('/login');
                     toast.success("Password Reset Successful!",res.data.status);
                  }

        }catch(error){
          toast.error(error.response.data.message)
             
        }
    }
   
  };

  return (
    <div className="password-reset-container">
      <div className="reset-card">
        
        <form className="reset-form" onSubmit={handleSubmit}>
          {/* OTP Section */}
          <div className="form-section">
            <div className="reset-header">
          <h1>Reset Password</h1>
          <p>Password reset OTP sent to your email</p>
        </div>
            <label className="section-title">OTP</label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter OTP"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="form-section">
            <label className="section-title">New Password</label>
            <div className="input-group password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ?<FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password Section */}
          <div className="form-section">
            <label className="section-title">Confirm Password</label>
            <div className="input-group password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                className="form-input"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <span
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Password Requirement Section */}
          <div className="password-requirements">
            <h3>Password must contain:</h3>
            <ul>
              <li className={passwordValid.uppercase ? "valid" : ""}>
                <span className="requirement-icon">
                  {passwordValid.uppercase ? '✓' : "•"}
                </span>
                Uppercase letter
              </li>
              <li className={passwordValid.lowercase ? "valid" : ""}>
                <span className="requirement-icon">
                  {passwordValid.lowercase ? '✓' : "•"}
                </span>
                Lowercase letter
              </li>
              <li className={passwordValid.number ? "valid" : ""}>
                <span className="requirement-icon">
                  {passwordValid.number ? '✓' : "•"}
                </span>
                Number
              </li>
              <li className={passwordValid.specialChar ? "valid" : ""}>
                <span className="requirement-icon">
                  {passwordValid.specialChar ? '✓' : "•"}
                </span>
                Special character
              </li>
              <li className={passwordValid.minLength ? "valid" : ""}>
                <span className="requirement-icon">
                  {passwordValid.minLength ? '✓' : "⚪"}
                </span>
                Minimum 8 characters
              </li>
            </ul>
          </div>

          {/* Reset Password Button */}
          <div className="form-section">
            <button type="submit" className="reset-button">
              Reset Password
            </button>
          </div>

          {/* Back to Login Button */}
          <div className="back-to-login">
            <button type="button" className="back-button"  onClick={() => navigate('/login')}>
              <div style={{display: "flex", justifyContent:"center" ,alignItems: "center", gap: "8px"}}><IoMdArrowBack style={{fontSize:"20px"}}/> Back to Login</div> 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ChangePassword;
