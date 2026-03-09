import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Upload, FileText, Search, User, ArrowUpCircle, Download } from "lucide-react";
import "./Dashboard.css";
import API_BASE_URL from "../config/api";

/* ── Skeleton ── */
const DashboardSkeleton = () => (
  <div className="dashboard-container">
    <div className="skeleton-container">
      <div className="skeleton-block skeleton-hero" />
      <div className="skeleton-stats">
        <div className="skeleton-stat" />
        <div className="skeleton-stat" />
      </div>
      <div className="skeleton-grid">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}
      </div>
    </div>
  </div>
);

/* ── Dashboard ── */
const Dashboard = () => {
  const [user,    setUser]    = useState(null);
  const [stats,   setStats]   = useState({ notesUploaded: 0, notesDownloaded: 0 });
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("moilearn_token");
        if (!token) throw new Error("No auth token found");

        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

        const [userRes, statsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/user/profile`, { headers, credentials: "include" }),
          fetch(`${API_BASE_URL}/api/user/stats`,   { headers, credentials: "include" }),
        ]);

        if (!userRes.ok)  throw new Error("User fetch failed: "  + await userRes.text());
        if (!statsRes.ok) throw new Error("Stats fetch failed: " + await statsRes.text());

        setUser(await userRes.json());
        setStats(await statsRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const features = [
    { title: "Upload Notes", path: "/upload",     icon: Upload,   description: "Share your notes with others", className: "feature-card upload-card"   },
    { title: "My Uploads",   path: "/my-uploads", icon: FileText, description: "View and manage your notes",   className: "feature-card my-notes-card" },
    { title: "Browse Notes", path: "/notes",      icon: Search,   description: "Discover notes from others",   className: "feature-card browse-card"   },
    { title: "Profile",      path: "/profile",    icon: User,     description: "Manage your account",          className: "feature-card profile-card"  },
  ];

  if (loading) return <DashboardSkeleton />;

  if (error) return (
    <div className="dashboard-container">
      <div className="error-message">
        <h2>Unable to load dashboard</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">

        {/* ── Hero ── */}
        <header className="dashboard-header">
          <div className="header-inner">
            <h1 className="welcome-title">
              Welcome back, <span className="username-highlight">{user?.username || "User"} 👋</span>
            </h1>
            <p className="welcome-subtitle">Here's what's happening with your notes today.</p>
          </div>
        </header>

        {/* ── Stats ── */}
        <div className="stats-row">
          <div className="stat-card uploads">
            <div className="stat-icon"><ArrowUpCircle size={22} /></div>
            <div className="stat-text">
              <div className="stat-number">{stats.notesUploaded}</div>
              <div className="stat-label">Total Uploads</div>
            </div>
          </div>
          <div className="stat-card downloads">
            <div className="stat-icon"><Download size={22} /></div>
            <div className="stat-text">
              <div className="stat-number">{stats.notesDownloaded}</div>
              <div className="stat-label">Total Downloads</div>
            </div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <p className="section-title">Quick Actions</p>
        <div className="features-grid">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link key={f.path} to={f.path} className={f.className}>
                <div className="feature-icon"><Icon size={20} /></div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-description">{f.description}</p>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;