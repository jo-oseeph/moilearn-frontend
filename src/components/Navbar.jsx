import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { Menu, X, Home, BookOpen, FileText, GraduationCap, Upload, User, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock authentication state - replace with your actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({ name: 'John Doe', email: 'john@example.com' });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          moilearn
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <Home size={18} />
            Home
          </Link>
          <Link to="/notes" className="nav-link">
            <BookOpen size={18} />
            Notes
          </Link>
          <Link to="/past-papers" className="nav-link">
            <FileText size={18} />
            Past Papers
          </Link>
          <Link to="/schools" className="nav-link">
            <GraduationCap size={18} />
            Schools
          </Link>
          {isLoggedIn && (
            <Link to="/upload" className="nav-link">
              <Upload size={18} />
              Upload
            </Link>
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
                <Link to="/profile" className="dropdown-item">
                  <User size={16} />
                  Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <Settings size={16} />
                  Settings
                </Link>
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
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
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
            <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
              <Home size={18} />
              Home
            </Link>
            <Link to="/notes" className="mobile-nav-link" onClick={closeMenu}>
              <BookOpen size={18} />
              Notes
            </Link>
            <Link to="/past-papers" className="mobile-nav-link" onClick={closeMenu}>
              <FileText size={18} />
              Past Papers
            </Link>
            <Link to="/schools" className="mobile-nav-link" onClick={closeMenu}>
              <GraduationCap size={18} />
              Schools
            </Link>
            {isLoggedIn && (
              <Link to="/upload" className="mobile-nav-link" onClick={closeMenu}>
                <Upload size={18} />
                Upload
              </Link>
            )}
          </div>

          <div className="mobile-auth">
            {isLoggedIn ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <User size={18} />
                  <span>{user.name}</span>
                </div>
                <Link to="/profile" className="mobile-nav-link" onClick={closeMenu}>
                  <User size={18} />
                  Profile
                </Link>
                <Link to="/settings" className="mobile-nav-link" onClick={closeMenu}>
                  <Settings size={18} />
                  Settings
                </Link>
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
                <Link to="/signup" className="mobile-signup-btn" onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
