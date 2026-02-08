import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {  Lock, LogOut, Edit2, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import "./ProfilePage.css";
import API_BASE_URL from "../config/api";

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Helper function to get token
  const getToken = () => {
    return localStorage.getItem('moilearn_token') || sessionStorage.getItem('moilearn_token');
  };

  // Helper function to get headers with auth
  const getAuthHeaders = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleUpdateUsername = async () => {
    if (!formData.username || formData.username === user.username) {
      setShowEditUsername(false);
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ username: formData.username, email: user.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update username");
      }

      updateUser(data.user);
      setMessage({ type: "success", text: "Username updated successfully" });
      setShowEditUsername(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!formData.email || formData.email === user.email) {
      setShowEditEmail(false);
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ username: user.username, email: formData.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update email");
      }

      updateUser(data.user);
      setMessage({ type: "success", text: "Email updated successfully" });
      setShowEditEmail(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage({ type: "error", text: "All password fields are required" });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setMessage({ type: "success", text: "Password changed successfully" });
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordSection(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    setMessage({ type: "info", text: "Logging out..." });

    // Simulate logout process
    setTimeout(() => {
      logout();
      setMessage({ type: "success", text: "Logged out successfully" });
      setTimeout(() => {
        navigate("/");
      }, 500);
    }, 1000);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Avatar and Info */}
        <div className="profile-header">
          <div className="profile-avatar-large">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <h1 className="profile-name">{user?.username || "User"}</h1>
          <p className="profile-email">{user?.email}</p>
          <span className="profile-role">{user?.role?.toUpperCase() || "USER"}</span>
        </div>

        {/* Messages */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Account Details */}
        <div className="account-section">
          <h3>ACCOUNT DETAILS</h3>

          {/* Username Field */}
          <div className="detail-field">
            <label>USERNAME</label>
            {showEditUsername ? (
              <div className="edit-field">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoFocus
                />
                <div className="edit-actions">
                  <button
                    onClick={handleUpdateUsername}
                    disabled={loading}
                    className="btn-save-small"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setShowEditUsername(false);
                      setFormData({ ...formData, username: user.username });
                    }}
                    className="btn-cancel-small"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="field-display">
                <span>{user?.username}</span>
                <button
                  onClick={() => setShowEditUsername(true)}
                  className="btn-edit"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="detail-field">
            <label>EMAIL</label>
            {showEditEmail ? (
              <div className="edit-field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoFocus
                />
                <div className="edit-actions">
                  <button
                    onClick={handleUpdateEmail}
                    disabled={loading}
                    className="btn-save-small"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setShowEditEmail(false);
                      setFormData({ ...formData, email: user.email });
                    }}
                    className="btn-cancel-small"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="field-display">
                <span>{user?.email}</span>
                <button
                  onClick={() => setShowEditEmail(true)}
                  className="btn-edit"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Access Level */}
          <div className="detail-field">
            <label>ACCESS LEVEL</label>
            <div className="field-display-static">
              <span>{user?.role?.toUpperCase() || "USER"}</span>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="password-toggle-section">
          <button
            className="btn-toggle-password"
            onClick={() => setShowPasswordSection(!showPasswordSection)}
          >
            <Lock size={18} />
            <span>Change Password</span>
            {showPasswordSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showPasswordSection && (
            <div className="password-form">
              <div className="form-group-compact">
                <label>Current Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group-compact">
                <label>New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group-compact">
                <label>Confirm New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="btn-change-password"
              >
                {loading ? "Changing..." : "Update Password"}
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          className="btn-logout"
          onClick={handleLogout}
          disabled={logoutLoading}
        >
          {logoutLoading ? (
            <>
              <div className="spinner-small"></div>
              <span>Logging out...</span>
            </>
          ) : (
            <>
              <LogOut size={18} />
              <span>LOG OUT</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;