// components/Admin/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">Admin</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">Overview Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/manage-notes">Manage Notes</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
