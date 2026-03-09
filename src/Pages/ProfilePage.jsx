import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, LogOut, Edit2, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import "./ProfilePage.css";
import API_BASE_URL from "../config/api";

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
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

  const getToken = () =>
    localStorage.getItem("moilearn_token") || sessionStorage.getItem("moilearn_token");

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, username: user.username || "" }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      if (!res.ok) throw new Error(data.message || "Failed to update username");

      updateUser(data.user);
      setMessage({ type: "success", text: "Username updated successfully" });
      setShowEditUsername(false);
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
      if (!res.ok) throw new Error(data.message || "Failed to change password");

      setMessage({ type: "success", text: "Password changed successfully" });
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setShowPasswordSection(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      logout();
      navigate("/");
    }, 800);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar-large">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">{user?.username || "User"}</h1>
            <p className="profile-email">{user?.email}</p>
            <span className="profile-role">{user?.role?.toUpperCase() || "USER"}</span>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        {/* Account Details */}
        <div className="account-section">
          <h3>Account Details</h3>

          {/* Username */}
          <div className="detail-field">
            <label>Username</label>
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
                  <button onClick={handleUpdateUsername} disabled={loading} className="btn-save-small">
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setShowEditUsername(false);
                      setFormData((prev) => ({ ...prev, username: user.username }));
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
                <button onClick={() => setShowEditUsername(true)} className="btn-edit">
                  <Edit2 size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Email — read only */}
          <div className="detail-field">
            <label>Email</label>
            <div className="field-display-static">
              <span>{user?.email}</span>
            </div>
          </div>

          {/* Role */}
          <div className="detail-field">
            <label>Access Level</label>
            <div className="field-display-static">
              <span>{user?.role?.toUpperCase() || "USER"}</span>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="password-toggle-section">
          <button
            className="btn-toggle-password"
            onClick={() => setShowPasswordSection(!showPasswordSection)}
          >
            <Lock size={16} />
            <span>Change Password</span>
            {showPasswordSection ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showPasswordSection && (
            <div className="password-form">
              {[
                { label: "Current Password", name: "currentPassword", show: showCurrentPassword, toggle: () => setShowCurrentPassword(!showCurrentPassword) },
                { label: "New Password",     name: "newPassword",     show: showNewPassword,     toggle: () => setShowNewPassword(!showNewPassword) },
                { label: "Confirm Password", name: "confirmPassword", show: showConfirmPassword, toggle: () => setShowConfirmPassword(!showConfirmPassword) },
              ].map(({ label, name, show, toggle }) => (
                <div className="form-group-compact" key={name}>
                  <label>{label}</label>
                  <div className="password-input-wrapper">
                    <input
                      type={show ? "text" : "password"}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    <button type="button" className="toggle-password" onClick={toggle}>
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={handleChangePassword} disabled={loading} className="btn-change-password">
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <button className="logout-link" onClick={handleLogout} disabled={logoutLoading}>
          <LogOut size={14} />
          <span>{logoutLoading ? "Logging out..." : "Log out"}</span>
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;