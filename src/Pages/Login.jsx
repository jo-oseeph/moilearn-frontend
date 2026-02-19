import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, X } from "lucide-react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  linkWithCredential,
} from "firebase/auth";
import { auth } from "../firebase";
import API_BASE_URL from "../config/api";
import "./Login.css";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
    <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
    <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
    <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
  </svg>
);

const Login = () => {
  const { login, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Account linking state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkEmail, setLinkEmail] = useState("");
  const [linkPassword, setLinkPassword] = useState("");
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState("");
  const [pendingGoogleCredential, setPendingGoogleCredential] = useState(null);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      if (role === "admin") navigate("/admin/dashboard", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Helper: send Firebase ID token to backend and complete login
  const completeBackendLogin = async (firebaseUser) => {
    const idToken = await firebaseUser.getIdToken();

    const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: idToken,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Google login failed");
    }

    const { token, role: userRole, email, username, _id, profilePicture, authMethods } = data;

    const user = {
      role: userRole || "user",
      email,
      username: username || firebaseUser.displayName || "",
      _id,
      profilePicture,
      authMethods,
    };

    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    login(token, user, expiry);

    if (userRole === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  // Google Sign-In with account linking support
  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      const result = await signInWithPopup(auth, provider);

      // Extract email from multiple sources
      const googleUser = result.user;
      const providerEmail = googleUser.providerData?.[0]?.email;
      const directEmail = googleUser.email;
      const resolvedEmail = directEmail || providerEmail;

      console.log("🔍 Google sign-in result:");
      console.log("  user.email:", directEmail);
      console.log("  providerData email:", providerEmail);
      console.log("  user.displayName:", googleUser.displayName);
      console.log("  user.photoURL:", googleUser.photoURL);

      // Override the user object email with the resolved email
      const userWithEmail = {
        ...googleUser,
        email: resolvedEmail,
        getIdToken: () => googleUser.getIdToken(),
      };

      // Success — send token to backend, include email as fallback
      await completeBackendLogin(userWithEmail);

    } catch (err) {
      console.error("Google sign-in error:", err);

      // Account exists with different credential — trigger linking flow
      if (
        err.code === "auth/account-exists-with-different-credential" ||
        err.code === "auth/credential-already-in-use"
      ) {
        // Save the pending Google credential for linking later
        const credential = GoogleAuthProvider.credentialFromError(err);
        setPendingGoogleCredential(credential);
        setLinkEmail(err.customData?.email || "");
        setLinkError("");
        setLinkPassword("");
        setShowLinkModal(true);
      } else if (err.code === "auth/admin-restricted-operation") {
        setError(
          "This operation is restricted. Please check that Google Sign-In is properly configured in Firebase Console."
        );
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in cancelled. Please try again.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Popup blocked. Please allow popups for this site.");
      } else if (err.code === "auth/network-request-failed") {
        setError("Network error. Please check your connection.");
      } else {
        setError(err.message || "Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle account linking: sign in with password, then link Google credential
  const handleLinkAccount = async (e) => {
    e.preventDefault();
    if (!linkPassword) {
      setLinkError("Please enter your password.");
      return;
    }

    setLinkLoading(true);
    setLinkError("");

    try {
      // Step 1: Sign in with email & password via Firebase
      const userCredential = await signInWithEmailAndPassword(auth, linkEmail, linkPassword);

      // Step 2: Link the pending Google credential to this account
      if (pendingGoogleCredential) {
        await linkWithCredential(userCredential.user, pendingGoogleCredential);
        console.log("✅ Google account linked successfully!");
      }

      // Step 3: Send to backend (which will also merge on its side)
      await completeBackendLogin(userCredential.user);

      // Clean up modal state
      setShowLinkModal(false);
      setPendingGoogleCredential(null);
      setLinkPassword("");

    } catch (err) {
      console.error("Account linking error:", err);

      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setLinkError("Incorrect password. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setLinkError("Too many attempts. Please try again later.");
      } else if (err.code === "auth/provider-already-linked") {
        // Already linked — just sign in normally
        try {
          await completeBackendLogin(err.user || auth.currentUser);
          setShowLinkModal(false);
          setPendingGoogleCredential(null);
        } catch (backendErr) {
          setLinkError("Account already linked but login failed. Please try again.");
        }
      } else {
        setLinkError(err.message || "Failed to link accounts. Please try again.");
      }
    } finally {
      setLinkLoading(false);
    }
  };

  // Normal email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { token, role: userRole, email, username, _id, expiresIn, profilePicture, authMethods } = data;

      const user = {
        role: userRole,
        email,
        username: username || "",
        _id,
        profilePicture,
        authMethods,
      };

      const expiry = expiresIn ? Date.now() + expiresIn * 1000 : undefined;

      login(token, user, expiry);

      // Redirect based on role
      if (userRole === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to Moilearn</p>
        </div>

        {error && (
          <div className="error-alert">
            <p>{error}</p>
          </div>
        )}

        {/* Google Sign-in Button */}
        <div className="aauth-buttons">
          <button
            className="google-login-btn"
            onClick={handleGoogleLogin}
            disabled={googleLoading || isLoading}
            type="button"
          >
            <div className="google-icon-wrapper">
              <GoogleIcon />
            </div>
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading || googleLoading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading || googleLoading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-footer">
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="email-login-btn"
              disabled={isLoading || googleLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <Mail size={20} />
                  Sign in with Email
                </>
              )}
            </button>
          </form>
        </div>

        {/* Register Section */}
        <div className="register-section">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* ===== Account Linking Modal ===== */}
      {showLinkModal && (
        <div className="link-modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="link-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="link-modal-close"
              onClick={() => {
                setShowLinkModal(false);
                setPendingGoogleCredential(null);
                setLinkError("");
              }}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="link-modal-header">
              <div className="link-modal-icon">
                <GoogleIcon />
                <span className="link-icon-connector">+</span>
                <Mail size={24} />
              </div>
              <h3>Link Your Accounts</h3>
              <p>
                An account with <strong>{linkEmail}</strong> already exists.
                Enter your password to link your Google account.
              </p>
            </div>

            {linkError && (
              <div className="link-modal-error">
                <p>{linkError}</p>
              </div>
            )}

            <form onSubmit={handleLinkAccount} className="link-modal-form">
              <div className="form-group">
                <label htmlFor="link-password">Your Password</label>
                <input
                  type="password"
                  id="link-password"
                  placeholder="Enter your existing password"
                  value={linkPassword}
                  onChange={(e) => {
                    setLinkPassword(e.target.value);
                    if (linkError) setLinkError("");
                  }}
                  disabled={linkLoading}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                className="link-modal-submit"
                disabled={linkLoading}
              >
                {linkLoading ? (
                  <>
                    <span className="spinner"></span>
                    Linking...
                  </>
                ) : (
                  "Link Accounts & Sign In"
                )}
              </button>
            </form>

            <p className="link-modal-hint">
              After linking, you can sign in with either Google or your password.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;