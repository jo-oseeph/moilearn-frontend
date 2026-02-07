// components/Admin/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, FileText } from "lucide-react"; // icons
import "./AdminSidebar.css";

function Sidebar({ isOpen }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">Admin</h2>
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">
              <Home size={20} />
              <span className="link-text">Home</span>
            </Link>
          </li>
          <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
            <Link to="/admin/dashboard">
              <LayoutDashboard size={20} />
              <span className="link-text">Overview Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/admin/manage-notes" ? "active" : ""}>
            <Link to="/admin/manage-notes">
              <FileText size={20} />
              <span className="link-text">Manage Notes</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;