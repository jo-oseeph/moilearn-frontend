import React, { useState, useEffect } from 'react';
import { Download, FileText, GraduationCap } from 'lucide-react';
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
            notesCount: 16,
            pastPapersCount: 8,
            facultiesCount: 7,
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

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {/* Total Downloads */}
          <div className="stats-card notes-card">
            <div className="card-icon">
              <Download size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">Total Downloads</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton"></div>
                ) : (
                  <span className="animated-number">
                    {animateCount(stats.notesCount).toLocaleString()}
                  </span>
                )}
              </h3>
            </div>
          </div>

          {/* Past Papers Available */}
          <div className="stats-card papers-card">
            <div className="card-icon">
              <FileText size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">Past Papers</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton"></div>
                ) : (
                  <span className="animated-number">
                    {animateCount(stats.pastPapersCount).toLocaleString()}
                  </span>
                )}
              </h3>
            </div>
          </div>

          {/* Faculties Covered */}
          <div className="stats-card faculties-card">
            <div className="card-icon">
              <GraduationCap size={24} />
            </div>
            <div className="card-content">
              <p className="card-label">Faculties</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton"></div>
                ) : (
                  <span className="animated-number">
                    {animateCount(stats.facultiesCount)}
                  </span>
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;