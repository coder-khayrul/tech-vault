
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Components/Loader';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loader,userInfo } = useContext(AuthContext);
  const location = useLocation();

  if (loader) {
    return <Loader />;
  }

  if (!user) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
