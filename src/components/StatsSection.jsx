import React, { useState, useEffect } from 'react';
import { Download, FileText, GraduationCap, ArrowRight, TrendingUp } from 'lucide-react';
import './stats.css';

const StatsSection = () => {
  const [stats, setStats] = useState({
    notesCount: 0,
    pastPapersCount: 0,
    facultiesCount: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setTimeout(() => {
          setStats({
            notesCount: 1247,
            pastPapersCount: 583,
            facultiesCount: 12
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const animateCount = (targetCount) => {
    if (isLoading) return 0;
    return targetCount;
  };

  const handleDownloadsClick = () => {
    window.location.href = '/downloads';
  };

  const handlePastPapersClick = () => {
    window.location.href = '/past-papers';
  };

  const handleFacultiesClick = () => {
    window.location.href = '/faculties';
  };

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="section-header">
          <h2 className="section-title">Moi University Resources</h2>
          <p className="section-subtitle">
            Verified academic resources trusted by students across faculties
          </p>
        </div>

        <div className="stats-grid">
          {/* Total Downloads */}
          <div className="stats-card notes-card">
            <div className="card-border-top"></div>
            <div className="card-icon">
              <Download size={32} />
            </div>
            <div className="card-content">
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton"></div>
                ) : (
                  <span className="animated-number">
                    {animateCount(stats.notesCount).toLocaleString()}
                  </span>
                )}
              </h3>
              <p className="card-label">Total Downloads</p>
              <p className="card-description">
                Number of times academic materials have been accessed by students
              </p>
              <button className="card-button" onClick={handleDownloadsClick}>
                <span>View Downloads</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="card-trend">
              <TrendingUp size={14} />
              <span>+15% this month</span>
            </div>
          </div>

          {/* Past Papers Available */}
          <div className="stats-card papers-card">
            <div className="card-border-top"></div>
            <div className="card-icon">
              <FileText size={32} />
            </div>
            <div className="card-content">
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton"></div>
                ) : (
                  <span className="animated-number">
                    {animateCount(stats.pastPapersCount).toLocaleString()}
                  </span>
                )}
              </h3>
              <p className="card-label">Past Papers Available</p>
              <p className="card-description">
                Curated collection of past examination papers across courses
              </p>
              <button className="card-button" onClick={handlePastPapersClick}>
                <span>Browse Past Papers</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="card-trend">
              <TrendingUp size={14} />
              <span>+8% this month</span>
            </div>
          </div>

          {/* Faculties Covered */}
          <div className="stats-card faculties-card">
            <div className="card-border-top"></div>
            <div className="card-icon">
              <GraduationCap size={32} />
            </div>
            <div className="card-content">
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton"></div>
                ) : (
                  <span className="animated-number">
                    {animateCount(stats.facultiesCount)}
                  </span>
                )}
              </h3>
              <p className="card-label">Faculties Covered</p>
              <p className="card-description">
                Academic faculties currently supported on the platform
              </p>
              <button className="card-button" onClick={handleFacultiesClick}>
                <span>Explore Faculties</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="card-trend">
              <TrendingUp size={14} />
              <span>All active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
