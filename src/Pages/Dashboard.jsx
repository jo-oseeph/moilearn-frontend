// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

/**
 * IMPORTANT:
 * This component no longer checks/reads localStorage or redirects.
 * Access protection is handled by <ProtectedRoute>.
 * This removes the parse error + redirect loop that caused the "shake".
 */
const Dashboard = () => {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        {user && (
          <div className="user-welcome">
            <p>Hello, {user.name || user.username || user.email || 'User'}!</p>
            {user.email && <p className="user-email">{user.email}</p>}
          </div>
        )}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* Quick Stats */}
          <div className="dashboard-card">
            <h3>Quick Stats</h3>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Notes Uploaded</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Past Papers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Downloads</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-content">
                  <p>Uploaded Mathematics notes</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📄</div>
                <div className="activity-content">
                  <p>Downloaded Physics past paper</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🎓</div>
                <div className="activity-content">
                  <p>Joined Chemistry study group</p>
                  <span className="activity-time">3 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn primary">📤 Upload Notes</button>
              <button className="action-btn secondary">🔍 Browse Past Papers</button>
              <button className="action-btn secondary">👥 Find Study Groups</button>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="dashboard-card">
            <h3>Profile Summary</h3>
            <div className="profile-summary">
              <>
                <div className="profile-item">
                  <strong>Name:</strong> {user?.name || user?.username || 'Not provided'}
                </div>
                <div className="profile-item">
                  <strong>Email:</strong> {user?.email || 'Not provided'}
                </div>
                <div className="profile-item">
                  <strong>School:</strong> {user?.school || 'Not provided'}
                </div>
                <div className="profile-item">
                  <strong>Level:</strong> {user?.level || 'Not provided'}
                </div>
              </>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Debug (dev only) */}
      <div className="debug-info" style={{ margin: '20px 0', padding: '10px', background: '#f0f0f0', fontSize: '12px' }}>
        <strong>Debug Info:</strong>
        <p>Authenticated: {String(Boolean(user))}</p>
        <button onClick={logout} style={{ marginTop: '10px', padding: '5px 10px' }}>
          Logout (Debug)
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
