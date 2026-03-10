import React, { useState, useEffect } from 'react';
import { Download, FileText, GraduationCap } from 'lucide-react';
import './stats.css';
import API_BASE_URL from "../config/api.js";

const StatsSection = () => {
  const [stats, setStats] = useState({
    notesCount: 0,
    pastPapersCount: 0,
    facultiesCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/public-stats`);
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">

          {/* Total Downloads */}
          <div className="stats-card notes-card">
            <div className="card-icon"><Download size={22} /></div>
            <div className="card-content">
              <p className="card-label">Total Downloads</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton" />
                ) : (
                  <span className="animated-number">
                    {stats.notesCount.toLocaleString()}
                  </span>
                )}
              </h3>
            </div>
          </div>

          {/* Past Papers */}
          <div className="stats-card papers-card">
            <div className="card-icon"><FileText size={22} /></div>
            <div className="card-content">
              <p className="card-label">Past Papers</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton" />
                ) : (
                  <span className="animated-number">
                    {stats.pastPapersCount.toLocaleString()}
                  </span>
                )}
              </h3>
            </div>
          </div>

          {/* Faculties */}
          <div className="stats-card faculties-card">
            <div className="card-icon"><GraduationCap size={22} /></div>
            <div className="card-content">
              <p className="card-label">Faculties</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton" />
                ) : (
                  <span className="animated-number">
                    {stats.facultiesCount}
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