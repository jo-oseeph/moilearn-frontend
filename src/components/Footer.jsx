import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2>Moilearn</h2>
          <p>Empowering students through easy access to notes and past papers.</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@moilearn.com</p>
          <p>Phone: +254 700 000 000</p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Moilearn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
