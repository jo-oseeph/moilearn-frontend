import React from "react";
import { UserPlus, Upload, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./HowItWorks.css";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description:
        "Sign up in seconds to share your academic resources with friends.",
      icon: <UserPlus size={32} />,
      link: "/register",
    },
    {
      id: 2,
      title: "Browse Past Papers",
      description:
        "Explore past exam papers organized by faculty, course, and year.",
      icon: <Upload size={32} />,
      link: "/notes",
    },
    {
      id: 3,
      title: "Download & Prepare",
      description:
        "Download papers instantly and prepare confidently for your exams.",
      icon: <Download size={32} />,
      link: "/notes",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Get started in three simple steps and access past papers with ease
        </p>

        <div className="steps-grid">
          {steps.map((step) => (
            <div
              key={step.id}
              className="step-card"
              onClick={() => navigate(step.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(step.link)}
            >
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;