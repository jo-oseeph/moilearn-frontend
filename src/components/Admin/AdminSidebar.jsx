import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, FileText, User, LogOut } from "lucide-react";
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
              <Home className="sidebar-icon" />
              <span className="link-text">Home</span>
            </Link>
          </li>

          <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
            <Link to="/admin/dashboard">
              <LayoutDashboard className="sidebar-icon" />
              <span className="link-text">Overview Dashboard</span>
            </Link>
          </li>

          <li className={location.pathname === "/admin/manage-notes" ? "active" : ""}>
            <Link to="/admin/manage-notes">
              <FileText className="sidebar-icon" />
              <span className="link-text">Manage Notes</span>
            </Link>
          </li>

          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">
              <User className="sidebar-icon" />
              <span className="link-text">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="sidebar-bottom">
        <Link to="/logout" className="logout-link">
          <LogOut className="sidebar-icon" />
          <span className="link-text">Logout</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
