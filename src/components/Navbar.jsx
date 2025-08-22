import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, LogIn, UserPlus, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Brand */}
      <Link to="/" className="navbar-brand">Moilearn</Link>
      
      {/* Mobile menu toggle */}
      <button 
        className="menu-toggle" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        
        {!isLoggedIn ? (
          <div className="auth-buttons">
            <Link to="/login" className="btn-login" onClick={() => setMenuOpen(false)}>
              <LogIn size={18} /> Login
            </Link>
            <Link to="/register" className="btn-register" onClick={() => setMenuOpen(false)}>
              <UserPlus size={18} /> Register
            </Link>
          </div>
        ) : (
          <div className="profile-menu">
            <button 
              className="profile-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="user-avatar">
                <User size={16} />
              </div>
              {user?.name || user?.username}
            </button>
            {dropdownOpen && (
              <div className="dropdown">
                <Link to="/dashboard" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                  My Dashboard
                </Link>
                <Link to="/settings" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                  Settings
                </Link>
                <button onClick={() => { logout(); setDropdownOpen(false); setMenuOpen(false); }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Mobile menu overlay */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;