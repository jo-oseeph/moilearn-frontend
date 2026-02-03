import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, LogIn, UserPlus, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
 const { isLoggedIn, user, role, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.navbar-links') && !event.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false); // Close dropdown when opening menu
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  const handleProfileToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <>
      <nav className="navbar">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
          Moilearn
        </Link>
        
        {/* Mobile menu toggle */}
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/notes" onClick={handleLinkClick}>
          Past Papers
         </Link>
         
          {/* <Link to="/dashboard" onClick={handleLinkClick}>
            Dashboard
          </Link> */}
          
          {!isLoggedIn ? (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login" onClick={handleLinkClick}>
                <LogIn size={18} /> 
                Login
              </Link>
              <Link to="/register" className="btn-register" onClick={handleLinkClick}>
                <UserPlus size={18} /> 
                Register
              </Link>
            </div>
          ) : (
            <div className="profile-menu">
              <button 
                className="profile-button"
                onClick={handleProfileToggle}
                aria-expanded={dropdownOpen}
              >
                <div className="user-avatar">
                  <User size={16} />
                </div>
                {user?.name || user?.username || 'User'}
              </button>
              {dropdownOpen && (
                <div className="dropdown">
                <Link
  to={role === "admin" ? "/admin/dashboard" : "/dashboard"}
  onClick={handleLinkClick}
>
  My Dashboard
</Link>

                  <Link 
                    to="/settings" 
                    onClick={handleLinkClick}
                  >
                    Settings
                  </Link>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      
      {/* Mobile menu overlay */}
      <div 
        className={`menu-overlay ${menuOpen ? 'active' : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;