import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  // State management for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // State for handling loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes - updates state when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing again
    if (error) setError('');
  };

  // Handle form submission and authentication
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Basic client-side validation
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Send POST request to backend for authentication
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Authentication successful
        const { token, user } = data;
        
        // Store authentication data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        // Optional: Set token expiration time (if your backend provides it)
        if (data.expiresIn) {
          const expirationTime = Date.now() + (data.expiresIn * 1000);
          localStorage.setItem('tokenExpiration', expirationTime.toString());
        }
        
        // Redirect to dashboard or home page
        // In a real app, you'd use React Router's useNavigate
        window.location.href = '/dashboard';
      } else {
        // Handle authentication errors
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      // Handle network errors
      setError('Network error. Please check your connection and try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is already logged in (optional utility)
  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');
    
    if (token && expiration) {
      const isExpired = Date.now() > parseInt(expiration);
      if (isExpired) {
        // Token expired, clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('tokenExpiration');
        return false;
      }
      return true;
    }
    return false;
  };

  // Function to handle "Remember Me" functionality (optional enhancement)
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>
        </div>
        
        <div className="login-form">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="error-message">
              <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit Button with Loading Spinner */}
          <button 
            type="button" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        {/* Register Link */}
        <div className="register-link">
          <p>Don't have an account? <a href="/register">Create one here</a></p>
        </div>

        {/* Optional: Social Login Buttons */}
        <div className="divider">
          <span>or</span>
        </div>
        
        <div className="social-login">
          <button className="social-button google" disabled={isLoading}>
            <svg viewBox="0 0 24 24" className="social-icon">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;