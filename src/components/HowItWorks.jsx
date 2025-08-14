import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Sign up for free and set up your profile in minutes.",
      icon: "👤",
    },
    {
      id: 2,
      title: "Upload Notes & Papers",
      description: "Share your study materials for others to access.",
      icon: "📄",
    },
    {
      id: 3,
      title: "Download & Learn",
      description: "Browse and download notes to improve your studies.",
      icon: "⬇️",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
