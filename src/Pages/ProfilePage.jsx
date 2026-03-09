import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, LogOut, Edit2, Eye, EyeOff, ChevronDown, ChevronUp, ShieldCheck, User } from "lucide-react";
import "./ProfilePage.css";
import API_BASE_URL from "../config/api";

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showEditUsername, setShowEditUsername]         = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword,     setShowNewPassword]     = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading,       setLoading]       = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [message,       setMessage]       = useState({ type: "", text: "" });

  const getToken = () =>
    localStorage.getItem("moilearn_token") || sessionStorage.getItem("moilearn_token");

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  useEffect(() => {
    if (user) setFormData((p) => ({ ...p, username: user.username || "" }));
  }, [user]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
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
      const res  = await fetch(`${API_BASE_URL}/api/user/profile`, {
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
      setMessage({ type: "error", text: "All password fields are required" }); return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" }); return;
    }
    if (formData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" }); return;
    }
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const res  = await fetch(`${API_BASE_URL}/api/user/profile`, {
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
      setFormData((p) => ({ ...p, currentPassword: "", newPassword: "", confirmPassword: "" }));
      setShowPasswordSection(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => { logout(); navigate("/"); }, 800);
  };

  const passwordFields = [
    { label: "Current Password", name: "currentPassword", show: showCurrentPassword, toggle: () => setShowCurrentPassword((v) => !v) },
    { label: "New Password",     name: "newPassword",     show: showNewPassword,     toggle: () => setShowNewPassword((v)     => !v) },
    { label: "Confirm Password", name: "confirmPassword", show: showConfirmPassword, toggle: () => setShowConfirmPassword((v) => !v) },
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* ── Hero ── */}
        <div className="profile-hero">
          <div className="profile-avatar-large">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <h1 className="profile-name">{user?.username || "User"}</h1>
          <p className="profile-email">{user?.email}</p>
          <span className="profile-role">{user?.role?.toUpperCase() || "USER"}</span>
        </div>

        {/* ── Message ── */}
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        {/* ── Account Details Card ── */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-header-icon"><User size={15} /></div>
            <h3>Account Details</h3>
          </div>
          <div className="card-body">

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
                        setFormData((p) => ({ ...p, username: user.username }));
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
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Email — read only */}
            <div className="detail-field">
              <label>Email Address</label>
              <div className="field-display-static">
                <span>{user?.email}</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Security Card ── */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-header-icon"><ShieldCheck size={15} /></div>
            <h3>Security</h3>
          </div>
          <div className="card-body">
            <button
              className="btn-toggle-password"
              onClick={() => setShowPasswordSection((v) => !v)}
            >
              <Lock size={15} />
              <span>Change Password</span>
              {showPasswordSection ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {showPasswordSection && (
              <div className="password-form">
                {passwordFields.map(({ label, name, show, toggle }) => (
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
                        {show ? <EyeOff size={14} /> : <Eye size={14} />}
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
        </div>

        {/* ── Logout ── */}
        <button className="logout-link" onClick={handleLogout} disabled={logoutLoading}>
          <LogOut size={14} />
          <span>{logoutLoading ? "Logging out..." : "Log out"}</span>
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;