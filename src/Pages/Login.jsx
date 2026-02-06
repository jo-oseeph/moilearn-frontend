import React, { useState, useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import API_BASE_URL from "../config/api"; 


const Login = () => {
  const { login, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in, to correct dashboard based on role
  useEffect(() => {
    if (isLoggedIn) {
      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isLoggedIn, role, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);
    try {
     const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});


      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        // Build user object from top-level response
        const { token, role, email, username, _id, expiresIn } = data;
        const user = { role, email, username, _id };
        const expiry = expiresIn ? Date.now() + expiresIn * 1000 : undefined;

        login(token, user, expiry);

        // Redirect based on role after login
        if (role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Network error, try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};
export default Login;