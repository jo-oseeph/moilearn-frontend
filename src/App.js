import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import { HomePage } from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Forbidden from "./Pages/ForbiddenPage";
import NotesPage from "./Pages/NotesPage";

// User pages
import Dashboard from "./Pages/Dashboard";
import UploadNotePage from "./Pages/UploadNotePage";
import MyUploads from "./Pages/MyUploads";
import ProfilePage from './Pages/ProfilePage';

// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageNotes from "./Pages/Admin/ManageNotes";

// Wrapper to conditionally show Navbar and Footer
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <LayoutWrapper>
            <main className="main-content">
              <Routes>
                {/* --- Public routes --- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="/notes" element={<NotesPage />} />

                {/* --- Protected User routes --- */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadNotePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-uploads"
                  element={
                    <ProtectedRoute>
                      <MyUploads />
                    </ProtectedRoute>
                  }
                />

                {/* --- Admin routes (protected, with layout) --- */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <AdminDashboard />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/manage-notes"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <ManageNotes />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />

                {/* --- Catch all (404) --- */}
                <Route path="*" element={<div>Page not found</div>} />
              </Routes>
            </main>
          </LayoutWrapper>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;