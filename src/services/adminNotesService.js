import AuthService from "./AuthService";

const ADMIN_API = "http://localhost:5000/api/admin";

const authHeader = () => ({
  Authorization: `Bearer ${AuthService.getToken()}`,
  "Content-Type": "application/json",
});

export const fetchPendingNotes = async () => {
  const res = await fetch(`${ADMIN_API}/notes/pending`, {
    headers: authHeader(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pending notes");
  }

  return res.json();
};

export const approveNote = async (noteId) => {
  const res = await fetch(`${ADMIN_API}/notes/${noteId}/approve`, {
    method: "PUT",
    headers: authHeader(),
  });

  if (!res.ok) {
    throw new Error("Failed to approve note");
  }

  return res.json();
};

export const rejectNote = async (noteId, reason) => {
  const res = await fetch(`${ADMIN_API}/notes/${noteId}/reject`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) {
    throw new Error("Failed to reject note");
  }

  return res.json();
};
