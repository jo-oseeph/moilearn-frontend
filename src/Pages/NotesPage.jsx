import React, { useEffect, useMemo, useState } from "react";
// import "./NotesPage.css";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
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

  /**
   * Filter logic
   * - Search matches courseCode, courseTitle, school
   * - Category filters note / past_paper
   */
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

  const handleDownload = async (id) => {
    try {
      const res = await fetch(`/api/notes/${id}/download`);
      const data = await res.json();
      window.open(data.fileUrl, "_blank");
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  if (loading) {
    return <div className="notes-loading">Loading notes…</div>;
  }

  return (
    <div className="notes-page">
      <h1 className="notes-title">Available Notes</h1>

      {/* Filters */}
      <div className="notes-filters">
        <input
          type="text"
          placeholder="Search by course code, title, or school"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="note">Notes</option>
          <option value="past_paper">Past Papers</option>
        </select>
      </div>

      {/* Cards */}
      {filteredNotes.length === 0 ? (
        <p className="no-results">No notes found.</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.courseTitle}</h3>
              <p className="course-code">{note.courseCode}</p>

              <p className="meta">
                {note.school} · Year {note.year} · Sem {note.semester}
              </p>

              <div className="card-actions">
                <button
                  className="view-btn"
                  onClick={() => window.open(note.fileUrl, "_blank")}
                >
                  View
                </button>

                <button
                  className="download-btn"
                  onClick={() => handleDownload(note._id)}
                >
                  Download ({note.downloadsCount})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
