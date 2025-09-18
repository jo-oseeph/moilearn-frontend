// layouts/AdminLayout.jsx
import React from "react";
import Sidebar from "../components/Admin/AdminSidebar";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
}

export default AdminLayout;
