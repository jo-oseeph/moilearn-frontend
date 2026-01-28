import React, { useEffect, useState } from "react";
import {
  fetchPendingNotes,
  approveNote,
  rejectNote,
} from "../../services/adminNotesService.js";
// import "./ManageNotes.css";

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchPendingNotes();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await approveNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) return alert("Rejection reason required");

    setActionLoading(rejecting);
    try {
      await rejectNote(rejecting, reason);
      setNotes((prev) => prev.filter((n) => n._id !== rejecting));
      setRejecting(null);
      setReason("");
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p>Loading pending notes...</p>;
  if (error) return <p className="error">{error}</p>;
  if (notes.length === 0) return <p>No pending notes 🎉</p>;

  return (
    <div className="manage-notes">
      <h2>Pending Notes Review</h2>

      {notes.map((note) => (
        <div className="note-card" key={note._id}>
          <div className="note-info">
            <h3>
              {note.courseTitle} ({note.courseCode})
            </h3>
            <p>
              {note.school} • Year {note.year} • Sem {note.semester}
            </p>
            <p>
              Uploaded by: <strong>{note.uploadedBy?.email}</strong>
            </p>
            <a href={note.fileUrl} target="_blank" rel="noreferrer">
              View File
            </a>
          </div>

          <div className="note-actions">
            <button
              className="approve"
              disabled={actionLoading === note._id}
              onClick={() => handleApprove(note._id)}
            >
              Approve
            </button>
            <button
              className="reject"
              disabled={actionLoading === note._id}
              onClick={() => setRejecting(note._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {rejecting && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reject Note</h3>
            <textarea
              placeholder="Reason for rejection"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleReject}>Confirm Reject</button>
              <button onClick={() => setRejecting(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotes;
