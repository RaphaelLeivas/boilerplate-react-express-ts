import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

// pages
import { Home, Cats, Dogs, Clients, Profile } from '../pages';
import { PrivateRoute } from './index';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/cats" element={<PrivateRoute element={<Cats />} />} />
      <Route path="/dogs" element={<PrivateRoute element={<Dogs />} />} />
      <Route path="/clients" element={<PrivateRoute element={<Clients />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
