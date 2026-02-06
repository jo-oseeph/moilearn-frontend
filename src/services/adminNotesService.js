
import API_BASE_URL from "../config/api.js";
import AuthService from "./AuthService.js";

const ADMIN_API = `${API_BASE_URL}/api/admin`;

// Helper to build auth headers
const authHeader = () => ({
  Authorization: `Bearer ${AuthService.getToken()}`,
  "Content-Type": "application/json",
});

// Fetch pending notes
export const fetchPendingNotes = async () => {
  const res = await fetch(`${ADMIN_API}/notes/pending`, {
    headers: authHeader(),
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to fetch pending notes: " + text);
  }

  return res.json();
};

// Approve note
export const approveNote = async (noteId) => {
  const res = await fetch(`${ADMIN_API}/notes/${noteId}/approve`, {
    method: "PUT",
    headers: authHeader(),
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to approve note: " + text);
  }

  return res.json();
};

// Reject note
export const rejectNote = async (noteId, reason) => {
  const res = await fetch(`${ADMIN_API}/notes/${noteId}/reject`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ reason }),
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to reject note: " + text);
  }

  return res.json();
};

// Delete note
export const deleteNote = async (id) => {
  const token = AuthService.getToken();

  const res = await fetch(`${ADMIN_API}/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Delete failed: " + text);
  }

  return res.json();
};

// Fetch notes by status
export const fetchNotesByStatus = async (status = "pending") => {
  const token = AuthService.getToken();

  const res = await fetch(`${ADMIN_API}/notes?status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to fetch notes: " + text);
  }

  return res.json();
};
