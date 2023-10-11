// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void; // Add the logout function
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [user, setUser] = useState<User | null>(null);

      useEffect(() => {
        // Check if the user is already logged in (e.g., from stored token)
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode<{ user: User }>(token);
          setUser(decodedToken.user);
        }
      }, []);
    
      const login = (token: string) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode<{ user: User }>(token);
        setUser(decodedToken.user); // Setting user as the entire user object
        console.log(decodedToken);
      };
    
      const logout = () => {
        // Clear the authentication token and log the user out
        localStorage.removeItem('token');
        setUser(null);
      };
    
      return (
        <UserContext.Provider value={{ user, login, logout }}>
          {children}
        </UserContext.Provider>
      );
    };
    
    export const useAuth = () => {
      const context = useContext(UserContext);
      if (context === undefined) {
        throw new Error('useAuth must be used within a UserProvider');
      }
      return context;
    };