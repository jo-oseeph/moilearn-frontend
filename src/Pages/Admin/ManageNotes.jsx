
import React, { useEffect, useState } from "react";
import {
  approveNote,
  rejectNote,
  deleteNote,
  fetchNotesByStatus,
} from "../../services/adminNotesService.js";
import "./ManageNotes.css";
import { FaEye, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");
  const [deleting, setDeleting] = useState(null);

  const location = useLocation();
  const statusParam = new URLSearchParams(location.search).get("status") || "pending";

  const statusTitleMap = {
    pending: "Pending Notes Review",
    approved: "Approved Notes",
    rejected: "Rejected Notes",
    all: "All Notes",
  };

  // Load notes based on status query param
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const data = await fetchNotesByStatus(statusParam);
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [statusParam]);

  // Approve pending note
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

  // Reject pending note
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

  // Delete note (all statuses)
  const handleDelete = async () => {
    setActionLoading(deleting);
    try {
      await deleteNote(deleting);
      setNotes((prev) => prev.filter((n) => n._id !== deleting));
      setDeleting(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p className="error">{error}</p>;
  if (notes.length === 0) return <p>No {statusTitleMap[statusParam]} 🎉</p>;

  return (
    <div className="manage-notes">
      <h2>{statusTitleMap[statusParam]}</h2>

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <div className="note-info">
              <h3>
                {note.courseTitle} ({note.courseCode})
              </h3>
              <p>
                {note.school} • Year {note.year} • Sem {note.semester}
              </p>
          
            </div>

        <div className="note-actions">
  {/* PENDING NOTES */}
  {note.status === "pending" && (
    <>
      <button
        className="btn approve"
        disabled={actionLoading === note._id}
        onClick={() => handleApprove(note._id)}
      >
        Approve
      </button>

      <button
        className="btn reject"
        disabled={actionLoading === note._id}
        onClick={() => setRejecting(note._id)}
      >
        Reject
      </button>
    </>
  )}

  {/* APPROVED / REJECTED NOTES */}
  {note.status !== "pending" && (
    <>
      <button
        className="btn delete-icon"
        disabled={actionLoading === note._id}
        onClick={() => setDeleting(note._id)}
        title="Delete permanently"
      >
        <FaTrash />
      </button>

      <a
        href={note.fileUrl}
        target="_blank"
        rel="noreferrer"
        className="view-icon"
        title="View file"
      >
        <FaEye />
      </a>
    </>
  )}
</div>

          </div>
        ))}
      </div>

      {/* Reject modal */}
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
              <button className="btn approve" onClick={handleReject}>
                Confirm Reject
              </button>
              <button className="btn reject" onClick={() => setRejecting(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleting && (
        <div className="modal">
          <div className="modal-content">
            <h3>Delete Note</h3>
            <p>
              This will permanently delete the file and record.
              <br />
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn delete" onClick={handleDelete}>
                Confirm Delete
              </button>
              <button className="btn reject" onClick={() => setDeleting(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotes;
