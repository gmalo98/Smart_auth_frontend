import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './CSS/VerifyEmail.css';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const VerifyEmail = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false); // loading for resend OTP

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/verify-account`, { otp }, {
        withCredentials: true,
      });
      if (response.data.data.user) {
    dispatch(setAuthUser(response.data.data.user));
  }
  console.log("User set in Redux:", response.data.data.user.isVerified);
      toast.success(response.data.message || "Email verified successfully"); 
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    setResending(true);
    try {
      const response = await axios.post(`${API_URL}/resend-otp`,null,{
        withCredentials: true,
      });
      if(response.data.status==="success"){
        toast.success("New verification otp sent to your email");
      }
      //toast.success(response.data.message || "OTP resent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="verify-container">
      <form className="verify-form" onSubmit={handleVerify}>
        <h2>Email Verification</h2>

        <div className="input-group">
          <label>Verification OTP sent to your email</label>
          <input
            type="text"
            placeholder="Enter Your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={4}
          />
        </div>

        <button type="submit" disabled={loading} className="verify-button">
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>

        <button
          type="button"
          className="resend-button"
          onClick={handleResendOTP}
          disabled={resending}
        >
          {resending ? 'Resending...' : 'Resend OTP'}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
