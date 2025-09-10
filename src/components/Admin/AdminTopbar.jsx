// components/AdminTopbar/AdminTopbar.jsx
import React from "react";
import "./AdminTopbar.css";

const AdminTopbar = ({ onToggleSidebar }) => {
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onToggleSidebar}>
        ☰
      </button>
      <h1 className="topbar-title">Dashboard</h1>
    </header>
  );
};

export default AdminTopbar;
