// layouts/AdminLayout.jsx
import React, { useState } from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTopbar from "../components/Admin/AdminTopbar";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={isSidebarOpen} />
      <div className="admin-main">
        <AdminTopbar toggleSidebar={toggleSidebar} />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
