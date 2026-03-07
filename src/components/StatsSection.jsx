import React, { useState, useEffect, useRef } from 'react';
import { Download, FileText, GraduationCap } from 'lucide-react';
import './stats.css';
import API_BASE_URL from "../config/api.js";

const CARD_COUNT = 3;

const StatsSection = () => {
  const [stats, setStats] = useState({
    notesCount: 0,
    pastPapersCount: 0,
    facultiesCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

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

  /* Track scroll position → update active dot */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const cardWidth = el.scrollWidth / CARD_COUNT;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, CARD_COUNT - 1));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const animateCount = (val) => (isLoading ? 0 : val);

  return (
    <section className="stats-section">
      <div className="stats-container" ref={containerRef}>
        <div className="stats-grid">

          {/* Total Downloads */}
          <div className="stats-card notes-card">
            <div className="card-icon"><Download size={24} /></div>
            <div className="card-content">
              <p className="card-label">Total Downloads</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton" />
                ) : (
                  <span className="animated-number">
                    {animateCount(stats.notesCount).toLocaleString()}
                  </span>
                )}
              </h3>
            </div>
          </div>

          {/* Past Papers */}
          <div className="stats-card papers-card">
            <div className="card-icon"><FileText size={24} /></div>
            <div className="card-content">
              <p className="card-label">Past Papers</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton" />
                ) : (
                  <span className="animated-number">
                    {animateCount(stats.pastPapersCount).toLocaleString()}
                  </span>
                )}
              </h3>
            </div>
          </div>

          {/* Faculties */}
          <div className="stats-card faculties-card">
            <div className="card-icon"><GraduationCap size={24} /></div>
            <div className="card-content">
              <p className="card-label">Faculties</p>
              <h3 className="card-number">
                {isLoading ? (
                  <div className="loading-skeleton" />
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

      {/* Dots + hint — rendered outside scroll container so they stay centred */}
      <div className="swipe-dots">
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`swipe-dot${i === activeIndex ? ' active' : ''}`}
          />
        ))}
      </div>
      <p className="swipe-hint">swipe to see more</p>
    </section>
  );
};

export default StatsSection;