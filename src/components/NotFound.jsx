import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from "framer-motion";
import '../components/NotFound.css'

const NotFound = () => {
  return (
     <div className="error-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="error-card"
      >
       
        <h1 className="error-code">404</h1>
        <h2 className="error-heading">Oops! Page Not Found</h2>
        <p className="error-text">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="error-button" onClick={Navigate('/')} >
          Back
        </Link>
      </motion.div>
    </div>
  );
};


export default NotFound;
