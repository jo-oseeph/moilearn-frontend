import React from "react";
import "./FeaturesSection.css";
import { Upload, Download, BookOpen, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Upload size={32} />,
    title: "Easy Uploads",
    desc: "Share notes and papers in seconds."
  },
  {
    icon: <Download size={32} />,
    title: "Fast Downloads",
    desc: "Access materials instantly."
  },
  {
    icon: <BookOpen size={32} />,
    title: "Quality Resources",
    desc: "Verified and organized content."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Free Access",
    desc: "Study without barriers."
  }
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
