import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, FileText, User } from "lucide-react";
import "./AdminSidebar.css";

const navLinks = [
  { to: "/",                    icon: Home,            label: "Home"         },
  { to: "/admin/dashboard",     icon: LayoutDashboard, label: "Overview"     },
  { to: "/admin/manage-notes",  icon: FileText,        label: "Notes"        },
  { to: "/profile",             icon: User,            label: "Profile"      },
];

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="sidebar">

        {/* Brand */}
        <div className="sidebar-brand">
          <span className="brand-name">Moilearn</span>
        </div>

        {/* Nav */}
        <nav>
          <ul>
            {navLinks.map(({ to, icon: Icon, label }) => (
              <li key={to} className={isActive(to) ? "active" : ""}>
                <Link to={to}>
                  <Icon className="sidebar-icon" />
                  <span className="link-text">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </aside>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="bottom-nav">
        {navLinks.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`bottom-nav-item ${isActive(to) ? "active" : ""}`}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

export default Sidebar;