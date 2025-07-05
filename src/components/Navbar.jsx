import React, { useState } from 'react';
import '../pages/CSS/Navbar.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { FaEnvelope, FaMoon, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaSun, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

   const toggleLogin = () => {
     
  //   const user = useSelector((state) => state.auth.user);
  //   setIsLoggedIn(!isLoggedIn);
    setShowDropdown(!showDropdown);
   };

  const toggleTheme = () => {
   
    setDarkMode(!darkMode);
    // You would typically implement theme switching logic here
  };

   const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser()); // clear redux + localStorage
    navigate('/login');
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" style={{fontSize:"15px"}}>SmartAuth</a>
        </div>
        
        <div className="navbar-menu">
          <ul className="navbar-items">
            <li className="navbar-item products">
             <Link to='/products' style={{textDecoration:"none",color:"white"}}> <span>
                
                Products
              </span></Link>
            </li>
            <li className="navbar-item contact">
              <Link to='/contact' style={{textDecoration:"none",color:"white",hover:"yellow"}}><span >
                
                Contact Us
              </span>
              </Link>
            </li>
           <li className="navbar-item profile">
              <div className="profile-container">
                <button 
                  className="profile-button" 
                  onClick={toggleLogin}
                  aria-expanded={showDropdown}
                  aria-label="Profile menu"
                >
               <FaUserCircle size={24} />
                </button>
                
                
                 {showDropdown&& <div className="dropdown-menu">
                     <Link to={'/profile'}  className="dropdown-item">
                      <FaUserCircle className="dropdown-icon" />
                      Profile
                    </Link>
                    
                    <button className="dropdown-item" onClick={toggleTheme}>
                      {darkMode ? (
                        <>
                          <FaSun className="dropdown-icon" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <FaMoon className="dropdown-icon" />
                          Dark Mode
                        </>
                      )}
                    </button>
                    <button className="dropdown-item" onClick={toggleLogin}>
                      {user ? (
                        <button onClick={handleLogout} style={{textAlign:"start",width: "100%",background:"transparent",border:"none"}}>
                          <FaSignOutAlt style={{marginRight:"10px"}}  />
                          Logout
                        </button>
                      ) : (
                       <button onClick={() => navigate('/login')} style={{ textAlign:"start",width: "100%",background:"transparent",border:"none",padding:"10px"}}>
                          <FaSignInAlt style={{marginRight:"10px"}}/>
                          Login
                        </button>
                      )}
                    </button>
                  </div>
}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

//     <div
//       style={{
//          position: "absolute",
//   top: "0",
//   width: "100%",
//   height: "60px",
//   zIndex: "1000",
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
//         padding: '15px 30px',
//       }}
//     >
//       <h2>Logo</h2>

//       {user ? (
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <span>Hi, {user.username}</span>
//           <button
//             style={{
//               padding: '10px 15px',
//               background: 'red',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: 'pointer',
//             }}
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <button
//           style={{
//             padding: '10px 15px',
//             background: 'blue',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer',
//           }}
//           onClick={() => navigate('/login')}
//         >
//           Login
//         </button>
//       )}
//     </div>
//   );
// };

export default Navbar;
