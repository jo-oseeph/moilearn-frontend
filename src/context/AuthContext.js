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

  const login = (token, userData, expiryInSeconds) => {
   
    const expiry = expiryInSeconds
      ? Date.now() + expiryInSeconds * 1000
      : Date.now() + 7 * 24 * 60 * 60 * 1000;

    AuthService.saveAuth(token, userData, expiry);
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    AuthService.clearAuth();
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = (userData) => {
  setUser(userData);

  const currentToken = AuthService.getToken();       
  const expiry = AuthService.getExpiry();          

  if (currentToken && expiry) {
    AuthService.saveAuth(currentToken, userData, expiry);
  }
};

  const role = user?.role || "user";

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, role, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
