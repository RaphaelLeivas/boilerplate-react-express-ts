import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services';

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
