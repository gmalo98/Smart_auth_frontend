import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" />;

  // If user is not verified → go to verify page
  if (!user.isVerified) return <Navigate to="/verify-account" />;

  // If everything fine → allow route
  return children;
};


export default PrivateRoute
