// src/Pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "./Dashboard.css";
import API_BASE_URL from "../../config/api"; 


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ for navigation

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("moilearn_token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

      const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});


        if (!res.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await res.json();
        setStats(data.stats); // store stats directly
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Define cards with optional status filter for ManageNotes page
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <Users size={28} color="#1d4ed8" />,
      bg: "card-blue",
      link: null, // no redirect
    },
    {
      title: "Total Past Papers",
      value: stats?.totalNotes || 0,
      icon: <FileText size={28} color="#059669" />,
      bg: "card-green",
      link: "/admin/manage-notes?status=all",
    },
    {
      title: "Pending Notes",
      value: stats?.pendingNotes || 0,
      icon: <Clock size={28} color="#d97706" />,
      bg: "card-yellow",
      link: "/admin/manage-notes?status=pending",
    },
    {
      title: "Approved Notes",
      value: stats?.approvedNotes || 0,
      icon: <CheckCircle size={28} color="#16a34a" />,
      bg: "card-green",
      link: "/admin/manage-notes?status=approved",
    },
    {
      title: "Rejected Notes",
      value: stats?.rejectedNotes || 0,
      icon: <XCircle size={28} color="#dc2626" />,
      bg: "card-red",
      link: "/admin/manage-notes?status=rejected",
    },
  ];

  const handleCardClick = (link) => {
    if (link) navigate(link); // navigate only if link exists
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Overview</h1>
      <div className="dashboard-grid">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`dashboard-card ${card.bg} ${card.link ? "clickable" : ""}`}
            onClick={() => handleCardClick(card.link)}
            style={{ cursor: card.link ? "pointer" : "default" }}
          >
            <div className="card-icon">{card.icon}</div>
            <div className="card-info">
              <h2>{card.value}</h2>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
