import React from "react";
import "./CTASection.css";

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-text">
          <h2>Join Moilearn Today</h2>
          <p>Upload your notes or past papers and help students everywhere learn faster.</p>
        </div>
        <div className="cta-action">
          <a href="/signup" className="cta-btn">Get Started</a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
