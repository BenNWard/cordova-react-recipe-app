// AppRouter.js

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useAuth } from '../context/UserContext';
import Home from '../containers/Home/Home';
import RecipeDetails from '../containers/RecipeDetails/RecipeDetails';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import CreateRecipe from '../containers/CreateRecipe';
import PrivateRoute from './PrivateRoute';



const AppRouter = () => {
  const { user } = useAuth();

  // Define your routes in an array for better organization
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/recipe/:id', element: <RecipeDetails /> },
    { path: '/login', element: user ? <Navigate to="/" /> : <Login /> },
    { path: '/register', element: user ? <Navigate to="/" /> : <Register /> },
    {
      path: '/create-recipe',
      element: user ? <CreateRecipe /> : <Navigate to="/login" />,
    },
    // Add more routes as needed
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRouter;
