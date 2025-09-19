// src/Pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("moilearn_token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const res = await fetch("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await res.json();
        console.log("Fetched stats:", data); // 👈 debug
        setStats(data.stats); // ✅ FIX: store the stats object directly
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

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <Users size={28} color="#1d4ed8" />,
      bg: "card-blue",
    },
    {
      title: "Total Notes",
      value: stats?.totalNotes || 0,
      icon: <FileText size={28} color="#059669" />,
      bg: "card-green",
    },
    {
      title: "Pending Notes",
      value: stats?.pendingNotes || 0,
      icon: <Clock size={28} color="#d97706" />,
      bg: "card-yellow",
    },
    {
      title: "Approved Notes",
      value: stats?.approvedNotes || 0,
      icon: <CheckCircle size={28} color="#16a34a" />,
      bg: "card-green",
    },
    {
      title: "Rejected Notes",
      value: stats?.rejectedNotes || 0,
      icon: <XCircle size={28} color="#dc2626" />,
      bg: "card-red",
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Overview</h1>
      <div className="dashboard-grid">
        {cards.map((card, idx) => (
          <div key={idx} className={`dashboard-card ${card.bg}`}>
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
