import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // 👈 use auth context
import { getMyUploads } from "../services/notesService"; // 👈 use service, no axios
import "./MyUploads.css";

const MyUploads = () => {
  const { isLoggedIn } = useAuth();
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      if (!isLoggedIn) {
        setUploads([]); // clear if logged out
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("moilearn_token");
        if (!token) {
          setUploads([]);
          return;
        }

        const data = await getMyUploads(token); // use service
        setUploads(data);
      } catch (err) {
        console.error("Failed to fetch uploads", err);
        setUploads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, [isLoggedIn]); // 👈 re-run when login/logout changes

  if (!isLoggedIn) {
    return <p className="no-access">You must be logged in to view your uploads.</p>;
  }

  if (loading) return <p className="loading">Loading your uploads...</p>;

  if (uploads.length === 0)
    return <p className="no-uploads">You have not uploaded any notes yet.</p>;

  return (
    <div className="uploads-container">
      {uploads.map((note) => (
        <div className="upload-card" key={note._id}>
          <h3 className="upload-title">
            <span className="title-blue">{note.courseTitle}</span>{" "}
            (<span className="code-green">{note.courseCode}</span>)
          </h3>
          <p className="upload-date">
            Uploaded: {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <span className={`status-badge ${note.status}`}>
            {note.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MyUploads;
