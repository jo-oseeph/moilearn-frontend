import React, { useEffect, useMemo, useState } from "react";
import { FiDownload, FiFileText, FiCloud } from "react-icons/fi";
import "./NotesPage.css";
import API_BASE_URL from "../config/api"; 

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDownload = (id) => {
    window.location.href = `${API_BASE_URL}/api/notes/${id}/download`;
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
                <button
                  className="download-btn"
                  onClick={() => handleDownload(note._id)}
                >
                  <span>Download</span>
                  <FiDownload />
                </button>

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