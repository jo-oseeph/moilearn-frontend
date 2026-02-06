import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  FileText,
  Search,
  User,
} from "lucide-react";
import "./Dashboard.css";
import API_BASE_URL from "../config/api"; 

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    notesUploaded: 0,
    notesDownloaded: 0,
    notesBookmarked: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("moilearn_token");
        if (!token) throw new Error("No auth token found");

        // -------- FETCH USER PROFILE --------
        const userResponse = await fetch(
          `${API_BASE_URL}/api/user/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!userResponse.ok) {
          const text = await userResponse.text();
          throw new Error("User fetch failed: " + text);
        }

        const userData = await userResponse.json();
        setUser(userData);

        // -------- FETCH USER STATS --------
        const statsResponse = await fetch(
          `${API_BASE_URL}/api/user/stats`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!statsResponse.ok) {
          const text = await statsResponse.text();
          throw new Error("Stats fetch failed: " + text);
        }

        const statsData = await statsResponse.json();
        setStats(statsData);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const features = [
    {
      title: "Upload Notes",
      path: "/upload",
      icon: Upload,
      description: "Share your notes with others",
      className: "feature-card upload-card",
    },
    {
      title: "My Uploads",
      path: "/my-uploads",
      icon: FileText,
      description: "View and manage your notes",
      className: "feature-card my-notes-card",
    },
    {
      title: "Browse Notes",
      path: "/notes",
      icon: Search,
      description: "Discover notes from others",
      className: "feature-card browse-card",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: User,
      description: "Manage your account",
      className: "feature-card profile-card",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>Unable to load dashboard</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1 className="welcome-title">
            Welcome back,{" "}
            <span className="username-blue">
              {user?.username || "User"}
            </span>
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening with your notes today.
          </p>
        </header>

        <div className="user-info-card">
          <div className="stats-grid centered-stats">
            <div className="stat-item uploaded">
              <div className="stat-number">{stats.notesUploaded}</div>
              <div className="stat-label">My Uploads</div>
            </div>
            <div className="stat-item downloaded">
              <div className="stat-number">{stats.notesDownloaded}</div>
              <div className="stat-label">Downloads</div>
            </div>
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Link
                key={feature.path}
                to={feature.path}
                className={feature.className}
              >
                <div className="feature-content">
                  <div className="feature-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">
                    {feature.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
