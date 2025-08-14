import React, { useState } from 'react';
import './Navbar.css'; 
import { Menu, X, Home, BookOpen, FileText, GraduationCap, Upload, User, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock authentication state - replace with your actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    // Mock login - replace with actual login logic
    setIsLoggedIn(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Mock logout - replace with actual logout logic
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <a href="/" className="nav-logo">
          moilearn
        </a>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <a href="/" className="nav-link">
            <Home size={18} />
            Home
          </a>
          <a href="/notes" className="nav-link">
            <BookOpen size={18} />
            Notes
          </a>
          <a href="/past-papers" className="nav-link">
            <FileText size={18} />
            Past Papers
          </a>
          <a href="/schools" className="nav-link">
            <GraduationCap size={18} />
            Schools
          </a>
          {isLoggedIn && (
            <a href="/upload" className="nav-link">
              <Upload size={18} />
              Upload
            </a>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="nav-auth">
          {isLoggedIn ? (
            <div className="user-menu">
              <div className="user-info">
                <User size={18} />
                <span>{user.name}</span>
              </div>
              <div className="user-dropdown">
                <a href="/profile" className="dropdown-item">
                  <User size={16} />
                  Profile
                </a>
                <a href="/settings" className="dropdown-item">
                  <Settings size={16} />
                  Settings
                </a>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={handleLogin} className="login-btn">
                Login
              </button>
              <a href="/signup" className="signup-btn">
                Sign Up
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            <a href="/" className="mobile-nav-link" onClick={closeMenu}>
              <Home size={18} />
              Home
            </a>
            <a href="/notes" className="mobile-nav-link" onClick={closeMenu}>
              <BookOpen size={18} />
              Notes
            </a>
            <a href="/past-papers" className="mobile-nav-link" onClick={closeMenu}>
              <FileText size={18} />
              Past Papers
            </a>
            <a href="/schools" className="mobile-nav-link" onClick={closeMenu}>
              <GraduationCap size={18} />
              Schools
            </a>
            {isLoggedIn && (
              <a href="/upload" className="mobile-nav-link" onClick={closeMenu}>
                <Upload size={18} />
                Upload
              </a>
            )}
          </div>

          <div className="mobile-auth">
            {isLoggedIn ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <User size={18} />
                  <span>{user.name}</span>
                </div>
                <a href="/profile" className="mobile-nav-link" onClick={closeMenu}>
                  <User size={18} />
                  Profile
                </a>
                <a href="/settings" className="mobile-nav-link" onClick={closeMenu}>
                  <Settings size={18} />
                  Settings
                </a>
                <button onClick={handleLogout} className="mobile-logout-btn">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <button onClick={handleLogin} className="mobile-login-btn">
                  Login
                </button>
                <a href="/signup" className="mobile-signup-btn" onClick={closeMenu}>
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;