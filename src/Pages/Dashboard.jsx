import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Search, 
  User, 
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    notesUploaded: 0,
    notesDownloaded: 0,
    notesBookmarked: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and stats from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get user profile
        const userResponse = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('moilearn_token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await userResponse.json();
        setUser(userData);

        // Get user stats
        const statsResponse = await fetch('/api/user/stats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('moilearn_token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch stats');
        }
        
        const statsData = await statsResponse.json();
        setStats(statsData);
        
      } catch (err) {
        setError(err.message);
        console.error('Dashboard data fetch error:', err);
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
      className: "feature-card upload-card"
    },
    {
      title: "My Uploads",
      path: "/my-uploads",
      icon: FileText,
      description: "View and manage your notes",
      className: "feature-card my-notes-card"
    },
    {
      title: "Browse Notes",
      path: "/notes",
      icon: Search,
      description: "Discover notes from others",
      className: "feature-card browse-card"
    },
    {
      title: "Profile",
      path: "/profile",
      icon: User,
      description: "Manage your account",
      className: "feature-card profile-card"
    },
    // {
    //   title: "Notifications",
    //   path: "/notifications",
    //   icon: Bell,
    //   description: "View your notifications",
    //   className: "feature-card notifications-card"
    // },
    // {
    //   title: "Settings",
    //   path: "/settings",
    //   icon: Settings,
    //   description: "Configure your preferences",
    //   className: "feature-card settings-card"
    // }
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
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header Section */}
       <header className="dashboard-header">
  <h1 className="welcome-title">
    Welcome back, <span className="username-blue">{user?.username || 'User'} </span>
  </h1>
  <p className="welcome-subtitle">
    Here's what's happening with your notes today.
  </p>
</header>

      {/* User Info & Stats Section */}
<div className="user-info-card">
  <div className="stats-grid centered-stats">
    <div className="stat-item uploaded">
      <div className="stat-number">{stats.notesUploaded}</div>
      <div className="stat-label">Uploaded</div>
    </div>
    <div className="stat-item downloaded">
      <div className="stat-number">{stats.notesDownloaded}</div>
      <div className="stat-label">Downloads</div>
    </div>
  </div>
</div>

        {/* Features Grid */}
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
                  <p className="feature-description">{feature.description}</p>
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