// src/routes/PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../context/UserContext'; // Import UserRole

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  requiredRole: UserRole; // Add requiredRole prop
}

const checkRolePermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roles: Record<UserRole, number> = {
    [UserRole.USER]: 1,
    [UserRole.ADMIN]: 2,
  };

  return roles[userRole] >= roles[requiredRole];
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element, requiredRole }) => {
  const { user } = useAuth();

  return user && checkRolePermission(user.role, requiredRole) ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
