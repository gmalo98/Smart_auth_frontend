import React, { useState } from 'react'
import './CSS/Signup.css';
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL;
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
//import API_URL from './server.js'
const Signup = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
const [userdata,setUserData]=useState({
  username:"",
  email:"",
  password:"",
  passwordConfirm:"",

})
const [loading,setLoading]=useState(false);


  const handleSignup = (e) => {
    // e.preventDefault();
    const {name,value}=e.target;
    setUserData({
      ...userdata,
      [name]: value,
    });
  };

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      
         const response = await axios.post(`${API_URL}/signup`, userdata, {
        withCredentials:true
      });
      
      if(response.data.status==='success'){
        console.log(response.status.status)
        toast.success(response.data.status);
        dispatch(setAuthUser(response.data.data.user));
        navigate('/verify-account');
        
      }
    }catch(error){
      toast.error(error.response.data.message);
      console.log("I am rror messagee", error);
    }
    finally{
      setLoading(false);
    }
  }


  return (
   
   <div className="signup-container">
    {loading?(<h1>Loadig...</h1>):(
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* {JSON.stringify(userdata)}; */}
        <h2>Sign Up</h2>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            placeholder="Enter your username"
            value={userdata.username}
            onChange={handleSignup}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={userdata.email}
            onChange={handleSignup}
          />
        </div>

        <div className="input-group">
                    <label className="section-title">New Password</label>
                    <div className="input-group password-input">
                      <input
                        type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Enter password"
            value={userdata.password}
            onChange={handleSignup}
                      />
                      <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ?<FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

        
                  <div className="input-group">
                    <label>Confirm Password</label>
                    <div className="input-group password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                          name="passwordConfirm"
                          required
                          placeholder="Confirm password"
                          value={userdata.passwordConfirm}
                          onChange={handleSignup}
                      />
                      <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ?<FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
        <button type="submit" className="signup-button">Create Account</button>

        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>)}
    </div>
  );
};

export default Signup
