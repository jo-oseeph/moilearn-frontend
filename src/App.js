import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Import your page components
import { HomePage } from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import AdminDashboard from './Pages/AdminDashboard'; // Added import
import Forbidden from './Pages/ForbiddenPage';
import UploadNotePage from './Pages/UploadNotePage.jsx';
import MyUploads from './Pages/MyUploads.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/upload" element={<UploadNotePage />} />
            <Route path="/my-uploads" element={<MyUploads />} />

              {/* Protected routes */}
             <Route 
  path="/dashboard" 
  element={
    <ProtectedRoute requiredRole="user">
      <Dashboard />
    </ProtectedRoute>
  } 
/>
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Catch all route - 404 page */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}
export default App;