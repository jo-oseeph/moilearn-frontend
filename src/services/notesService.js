// services/notesService.js
import AuthService from "../services/AuthService.js";

const API_URL = "http://localhost:5000/api/notes"; // adjust if backend URL differs

// Upload a note or past paper
export const uploadNote = async (formData, onProgress) => {
  try {
    const token = AuthService.getToken();

    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_URL}/upload`);

      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject({ message: xhr.responseText || "Upload failed" });
        }
      };

      xhr.onerror = () => reject({ message: "Network error" });

      xhr.send(formData);
    });
  } catch (err) {
    throw err;
  }
};

// Get all notes (public)
export const getAllNotes = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch notes");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// Search notes (public)
export const searchNotes = async (query) => {
  try {
    const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search failed");
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// Filter notes (public)
export const filterNotes = async (filters) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_URL}/filter?${queryString}`);
    if (!res.ok) throw new Error("Filter request failed");
    return await res.json();
  } catch (err) {
    throw err;
  }
};
