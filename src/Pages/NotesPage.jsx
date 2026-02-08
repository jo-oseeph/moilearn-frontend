import React, { useEffect, useMemo, useState } from "react";
import { FiDownload, FiFileText, FiCloud, FiEye } from "react-icons/fi";
import "./NotesPage.css";
import API_BASE_URL from "../config/api"; 

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  const [search, setSearch] = useState("");
  const [category,] = useState("all");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/notes`, {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error("Failed to fetch notes: " + text);
        }

        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const query = search.toLowerCase();

      const matchesSearch =
        note.courseCode.toLowerCase().includes(query) ||
        note.courseTitle.toLowerCase().includes(query) ||
        note.school.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || note.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [notes, search, category]);

  const handleDownload = async (id, courseCode, courseTitle) => {
    setDownloadingId(id);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/${id}/download`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      // Get the filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `${courseCode}_${courseTitle}.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Convert response to blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download file. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePreview = (id) => {
    window.open(`${API_BASE_URL}/api/notes/${id}/preview`, '_blank');
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="note-card skeleton-card">
      <div className="skeleton skeleton-icon"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-code"></div>
      <div className="skeleton skeleton-meta"></div>
      <div className="card-actions">
        <div className="skeleton skeleton-button"></div>
        <div className="skeleton skeleton-count"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="notes-page">
        <h1 className="notes-title">Available Notes</h1>
        <div className="notes-filters">
          <input
            type="text"
            placeholder="Search by course code, title, or school"
            disabled
          />
        </div>
        <div className="notes-grid">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="notes-page">
      <h1 className="notes-title">Available Notes</h1>

      <div className="notes-filters">
        <input
          type="text"
          placeholder="Search by course code, title, or school"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredNotes.length === 0 ? (
        <p className="no-results">No notes found.</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div className="note-card" key={note._id}>
              <div className="file-icon">
                <FiFileText />
              </div>

              <h3>{note.courseTitle}</h3>
              <p className="course-code">{note.courseCode}</p>

              <p className="meta">
                {note.school} · Year {note.year} · Sem {note.semester}
              </p>

              <div className="card-actions">
                <div className="action-buttons">
                  <button
                    className="preview-btn"
                    onClick={() => handlePreview(note._id)}
                    title="Preview"
                  >
                    <FiEye />
                  </button>

                  <button
                    className="download-btn"
                    onClick={() => handleDownload(note._id, note.courseCode, note.courseTitle)}
                    disabled={downloadingId === note._id}
                  >
                    {downloadingId === note._id ? (
                      <>
                        <span>Downloading...</span>
                        <div className="spinner"></div>
                      </>
                    ) : (
                      <>
                        <span>Download</span>
                        <FiDownload />
                      </>
                    )}
                  </button>
                </div>

                <div className="download-count">
                  <FiCloud />
                  <span>{note.downloadsCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;