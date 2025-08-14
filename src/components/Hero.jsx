import React from 'react';
import { BookOpen, Upload, Users, ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const handleBrowseNotes = () => {
    window.location.href = '/notes';
  };

  const handleUploadClick = () => {
    // Check if user is authenticated - replace with your auth logic
    const isAuthenticated = localStorage.getItem('token') || false;
    
    if (isAuthenticated) {
      window.location.href = '/upload';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Users size={16} />
              <span>Join 1,000+ students in Moi University</span>
            </div>
            
            <h1 className="hero-title">
              Learn together, 
              <span className="hero-title-highlight"> succeed together</span>
            </h1>
            
            <p className="hero-description">
              Connect with fellow students, share your knowledge, and access quality study materials 
              from your peers. Building a community where academic success is shared.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">15K+</span>
                <span className="stat-label">Notes Shared</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8K+</span>
                <span className="stat-label">Past Papers</span>
              </div>
            </div>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={handleBrowseNotes}
              >
                <BookOpen size={18} />
                Browse Notes
                <ArrowRight size={16} />
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={handleUploadClick}
              >
                <Upload size={18} />
                Upload Materials
              </button>
            </div>
            
            <div className="hero-trust">
              {/* <p>Trusted by students from top universities across Kenya</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;