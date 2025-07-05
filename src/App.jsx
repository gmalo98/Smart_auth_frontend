import { useEffect, useState } from 'react'
import  { Routes,Route, useLocation } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import VerifyEmail from './pages/VerifyEmail';
import PasswordReset from './pages/PasswordReset';
import ChangePassword from './pages/ChangePassword';
import PublicRoute from './ProtectedRoutes/PublicRoute';
import PrivateRoute from './ProtectedRoutes/PrivateRoute';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import NotFound from './components/NotFound';
import Products from './pages/Products';
import { useDispatch } from 'react-redux';
import { setAuthUser, logoutUser } from './redux/authSlice';

function App() {
const location = useLocation();
const dispatch = useDispatch();

const hideNavbar =
  location.pathname === '/login' ||
  location.pathname === '/signup' ||
  location.pathname === '/verify-account' ||
  location.pathname === '/forget-password' ||
  location.pathname === '/reset-password';


  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const res = await axios.get('/api/auth/me', {
  //         withCredentials: true,
  //       });
  //       dispatch(setAuthUser(res.data.user));
  //     } catch (err) {
  //       dispatch(logoutUser());
  //     }
  //   };

  //   getUser();
  // }, [dispatch]);

  return (
    <>
    <ToastContainer/>

      {!hideNavbar && <Navbar/>}
       <Routes>
        <Route path="/" element={
          <PrivateRoute>
          <Home />
          </PrivateRoute>} />
        <Route path="/login" element={
           <PublicRoute>
          <Login />
          </PublicRoute>
          } />
        <Route path="/signup" element={
          <PublicRoute>
          <Signup />
          </PublicRoute>} />
        <Route path="/verify-account" element={
          <PublicRoute>
          <VerifyEmail/>
          </PublicRoute>
          }/>
        <Route path="/forget-password" element={
          <PublicRoute>
          <PasswordReset/>
          </PublicRoute>}/>
        <Route path='/reset-password' element={
          <PublicRoute>
          <ChangePassword/>
          </PublicRoute>
          }/>
          <Route path='/profile' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
            }/>
            <Route path='/contact' element={
            <PrivateRoute>
            <Contact/>
            </PrivateRoute>
            }/>
           <Route path='/products' element={
            <PrivateRoute>
            <Products/>
            </PrivateRoute>
            }/>
            <Route path="*" element={<NotFound />} />

      </Routes> 

    </>
  )
}

export default App
