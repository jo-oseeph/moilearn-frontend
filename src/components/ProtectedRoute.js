import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, role } = useAuth();
  const location = useLocation();

  // Check if user is logged in
  if (!isLoggedIn) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if a specific role is required
  if (requiredRole) {
    // If user's role doesn't match the required role
    if (role !== requiredRole) {
      // Admins can access both admin and user routes
      if (requiredRole === "user" && role === "admin") {
        return children;
      }
      // Regular users trying to access admin routes get forbidden
      return <Navigate to="/forbidden" replace />;
    }
  }

  // User is authenticated and has the right role (or no role required)
  return children;
};

export default ProtectedRoute;