import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, GraduationCap, ArrowRight, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  // Mock data - replace with actual API calls
  const [stats, setStats] = useState({
    notesCount: 0,
    pastPapersCount: 0,
    facultiesCount: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate API call - replace with your actual API endpoints
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace these with your actual API calls
        // const notesResponse = await fetch('/api/stats/notes');
        // const papersResponse = await fetch('/api/stats/past-papers');
        // const facultiesResponse = await fetch('/api/stats/faculties');
        
        // Mock data for demonstration
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

  // Counter animation effect
  const animateCount = (targetCount) => {
    if (isLoading) return 0;
    return targetCount;
  };

  const handleNotesClick = () => {
    window.location.href = '/notes';
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
            Explore our growing collection of academic materials from various faculties
          </p>
        </div>

        <div className="stats-grid">
          {/* Notes Card */}
          <div className="stats-card notes-card">
            <div className="card-border-top"></div>
            <div className="card-icon">
              <BookOpen size={32} />
            </div>
            <div className="card-content">
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton"></div>
                ) : (
                  <span className="animated-number">{animateCount(stats.notesCount).toLocaleString()}</span>
                )}
              </h3>
              <p className="card-label">Notes Shared</p>
              <p className="card-description">
                Quality study notes from top-performing students across all courses
              </p>
              <button className="card-button" onClick={handleNotesClick}>
                <span>Browse Notes</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="card-trend">
              <TrendingUp size={14} />
              <span>+15% this month</span>
            </div>
          </div>

          {/* Past Papers Card */}
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
                  <span className="animated-number">{animateCount(stats.pastPapersCount).toLocaleString()}</span>
                )}
              </h3>
              <p className="card-label">Past Papers</p>
              <p className="card-description">
                Comprehensive collection of previous examination papers and solutions
              </p>
              <button className="card-button" onClick={handlePastPapersClick}>
                <span>Browse Papers</span>
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="card-trend">
              <TrendingUp size={14} />
              <span>+8% this month</span>
            </div>
          </div>

          {/* Faculties Card */}
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
                  <span className="animated-number">{animateCount(stats.facultiesCount)}</span>
                )}
              </h3>
              <p className="card-label">Total Faculties</p>
              <p className="card-description">
                Covering diverse academic disciplines from Engineering to Arts
              </p>
              <button className="card-button" onClick={handleFacultiesClick}>
                <span>View Faculties</span>
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

      <style jsx>{`
        .stats-section {
          padding: 80px 20px;
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007bff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .stats-card {
          background: white;
          border-radius: 16px;
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .stats-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .card-border-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 16px 16px 0 0;
        }

        .notes-card .card-border-top {
          background: linear-gradient(90deg, #007bff 0%, #4dabf7 100%);
        }

        .papers-card .card-border-top {
          background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
        }

        .faculties-card .card-border-top {
          background: linear-gradient(90deg, #fd7e14 0%, #ffc107 100%);
        }

        .card-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
        }

        .notes-card .card-icon {
          background: linear-gradient(135deg, rgba(0, 123, 255, 0.1) 0%, rgba(77, 171, 247, 0.1) 100%);
          color: #007bff;
        }

        .papers-card .card-icon {
          background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%);
          color: #28a745;
        }

        .faculties-card .card-icon {
          background: linear-gradient(135deg, rgba(253, 126, 20, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%);
          color: #fd7e14;
        }

        .card-content {
          margin-bottom: 20px;
        }

        .card-number {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1;
        }

        .notes-card .card-number {
          color: #007bff;
        }

        .papers-card .card-number {
          color: #28a745;
        }

        .faculties-card .card-number {
          color: #fd7e14;
        }

        .animated-number {
          display: inline-block;
          animation: countUp 1.5s ease-out;
        }

        @keyframes countUp {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .loading-skeleton {
          height: 48px;
          width: 120px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          border-radius: 8px;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .card-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .card-description {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .card-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .notes-card .card-button {
          background: linear-gradient(135deg, #007bff 0%, #4dabf7 100%);
          color: white;
        }

        .papers-card .card-button {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
        }

        .faculties-card .card-button {
          background: linear-gradient(135deg, #fd7e14 0%, #ffc107 100%);
          color: white;
        }

        .card-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .card-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .card-button:hover::before {
          left: 100%;
        }

        .card-trend {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #28a745;
          font-weight: 500;
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(40, 167, 69, 0.1);
          padding: 6px 10px;
          border-radius: 20px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .stats-section {
            padding: 60px 20px;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .stats-card {
            padding: 24px 20px;
          }

          .card-number {
            font-size: 2.5rem;
          }

          .card-trend {
            position: static;
            margin-bottom: 16px;
            align-self: flex-start;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }

          .card-number {
            font-size: 2rem;
          }

          .card-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;