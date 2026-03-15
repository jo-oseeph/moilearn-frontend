import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import API_BASE_URL from "../config/api";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fp-container">
      <div className="fp-card">
        {/* Back to login */}
        <Link to="/login" className="fp-back-link">
          <ArrowLeft size={16} />
          Back to login
        </Link>

        {!submitted ? (
          <>
            <div className="fp-header">
              <div className="fp-icon-wrap">
                <Mail size={24} color="#16a34a" />
              </div>
              <h2>Forgot Password?</h2>
              <p>No worries. Enter your email and we'll send you a reset link.</p>
            </div>

            {error && (
              <div className="fp-error-alert">
                <p>{error}</p>
              </div> 
            )}

            <form onSubmit={handleSubmit} className="fp-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={isLoading}
                  required
                />
              </div>

              <button type="submit" className="fp-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="fp-register-section">
              <p>
                Remember your password? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </>
        ) : (
          // Success state
          <div className="fp-success">
            <div className="fp-success-icon">
              <CheckCircle size={40} color="#16a34a" />
            </div>
            <h2>Check your inbox</h2>
            <p>
              If <strong>{email}</strong> is registered with Moilearn, you'll
              receive a password reset link shortly.
            </p>
            <p className="fp-success-note">
              Didn't receive it? Check your spam folder or{" "}
              <button
                className="fp-resend-btn"
                onClick={() => setSubmitted(false)}
              >
                try again
              </button>
              .
            </p>
            <Link to="/login" className="fp-submit-btn fp-back-to-login">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;