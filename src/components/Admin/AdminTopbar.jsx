import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminTopbar.css";

/* Map routes → readable titles */
const PAGE_TITLES = {
  "/admin/dashboard":    { title: "Overview",      breadcrumb: "Admin / Overview"      },
  "/admin/manage-notes": { title: "Manage Notes",  breadcrumb: "Admin / Manage Notes"  },
  "/profile":            { title: "Profile",       breadcrumb: "Admin / Profile"        },
  "/":                   { title: "Home",          breadcrumb: "Home"                   },
};

/* Format today's date */
const formatDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month:   "short",
    day:     "numeric",
  });

export default function AdminTopbar() {
  const { user, logout }   = useAuth();
  const location           = useLocation();
  const navigate           = useNavigate();
  const [open, setOpen]    = useState(false);
  const dropdownRef        = useRef(null);

  const page = PAGE_TITLES[location.pathname] ?? {
    title:      "Admin Panel",
    breadcrumb: "Admin",
  };

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  const initial = user?.username?.charAt(0).toUpperCase() ?? "A";

  return (
    <header className="topbar">

      {/* ── Left ── */}
      <div className="topbar-left">
        <h1 className="topbar-title">{page.title}</h1>
        <span className="topbar-breadcrumb">{page.breadcrumb}</span>
      </div>

      {/* ── Right ── */}
      <div className="topbar-right" ref={dropdownRef}>

        {/* Date pill */}
        <span className="topbar-date">{formatDate()}</span>

        {/* User button */}
        <button
          className="topbar-user"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          <div className="topbar-avatar">{initial}</div>
          <span className="topbar-username">{user?.username ?? "Admin"}</span>
          <ChevronDown
            size={14}
            className={`topbar-chevron ${open ? "open" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="topbar-dropdown">
            <div className="dropdown-header">
              <span className="dropdown-name">{user?.username ?? "Admin"}</span>
              <span className="dropdown-role">{user?.email ?? "admin@moilearn.com"}</span>
            </div>

            <Link
              to="/profile"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              <User size={15} />
              View Profile
            </Link>

            <div className="dropdown-divider" />

            <button className="dropdown-item danger" onClick={handleLogout}>
              <LogOut size={15} />
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}