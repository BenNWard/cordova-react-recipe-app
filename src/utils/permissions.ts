// src/utils/permissions.ts

import { UserRole } from '../context/UserContext';

export const checkPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roles: Record<UserRole, number> = {
    [UserRole.USER]: 1,
    [UserRole.ADMIN]: 2,
  };

  return roles[userRole] >= roles[requiredRole];
};
