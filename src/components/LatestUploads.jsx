import React from "react";
import "./LatestUploads.css";
import { Download, Eye, ThumbsUp, ThumbsDown, FileText } from "lucide-react";

const mockUploads = [
  {
    id: 1,
    title: "Introduction to AI",
    courseCode: "CS101",
    date: "2025-08-12",
    faculty: "Computer Science",
    downloads: 145,
    thumbnail: null,
  },
  {
    id: 2,
    title: "Engineering Mechanics Notes",
    courseCode: "ENG203",
    date: "2025-08-10",
    faculty: "Engineering",
    downloads: 92,
    thumbnail: null,
  },
  {
    id: 3,
    title: "Business Law Handout",
    courseCode: "BIZ110",
    date: "2025-08-08",
    faculty: "Business Studies",
    downloads: 67,
    thumbnail: null,
  },
];

export default function LatestUploads() {
  return (
    <section className="latest-uploads">
      <h2 className="section-title">Featured Materials / Latest Uploads</h2>
      <div className="uploads-grid">
        {mockUploads.map((upload) => (
          <div className="upload-card" key={upload.id}>
            <div className="thumbnail">
              {upload.thumbnail ? (
                <img src={upload.thumbnail} alt={upload.title} />
              ) : (
                <FileText size={40} className="file-icon" />
              )}
            </div>

            <h3 className="upload-title">{upload.title}</h3>

            <div className="upload-meta">
              <p>{upload.courseCode}</p>
              <p>{upload.date}</p>
              <p>{upload.faculty}</p>
            </div>

            <div className="upload-actions">
              <div className="action-buttons">
                <Download size={20} className="download-icon" />
                <Eye size={20} className="preview-icon" />
                <span className="download-count">{upload.downloads}</span>
              </div>
              <div className="like-buttons">
                <ThumbsUp size={18} className="like-icon" />
                <ThumbsDown size={18} className="dislike-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
