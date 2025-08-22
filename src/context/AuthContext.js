import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());
  const [user, setUser] = useState(AuthService.getUser());

  useEffect(() => {
    setIsLoggedIn(AuthService.isAuthenticated());
    setUser(AuthService.getUser());
  }, []);

  const login = (token, userData, expiry) => {
    AuthService.saveAuth(token, userData, expiry);
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    AuthService.clearAuth();
    setIsLoggedIn(false);
    setUser(null);
  };

  const role = user?.role || "user";

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);