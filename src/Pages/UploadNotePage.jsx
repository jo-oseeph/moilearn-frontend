import React, { useState } from "react";
import { uploadNote } from "../services/notesService";
import "./UploadNotesPage.css";

const UploadNotePage = () => {
  const [formData, setFormData] = useState({
    school: "",
    category: "",
    year: "",
    semester: "",
    courseCode: "",
    courseTitle: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview({
        name: selectedFile.name,
        size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
        type: selectedFile.type,
      });
    } else {
      setPreview(null);
    }
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview({
        name: droppedFile.name,
        size: (droppedFile.size / 1024 / 1024).toFixed(2) + " MB",
        type: droppedFile.type,
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setUploadProgress(0);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("file", file);

      await uploadNote(data, setUploadProgress);

      setSuccess("File uploaded successfully!");
      setFormData({
        school: "",
        category: "",
        year: "",
        semester: "",
        courseCode: "",
        courseTitle: "",
      });
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="page-title">Upload Note or Past Paper</h2>

      <form className="upload-form" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>School</label>
            <select
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
            >
              <option value="">Select School</option>
              <option value="School of Education">School of Education</option>
              <option value="School of Arts">School of Arts</option>
              <option value="School of Science">School of Science</option>
              <option value="School of Information Sciences">School of Information Sciences</option>
              <option value="School of Agriculture">School of Agriculture</option>
              <option value="School of Engineering">School of Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="note">Note</option>
              <option value="past_paper">Past Paper</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label>Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>
          </div>

          <div className="form-group">
            <label>Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label>Course Code</label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* File Upload */}
        <div
          className="file-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Drag & drop your file here, or click to select</p>
          <input type="file" onChange={handleFileChange} required />
        </div>

        {/* File Preview */}
        {preview && (
          <div className="file-preview">
            <p><strong>File:</strong> {preview.name}</p>
            <p><strong>Size:</strong> {preview.size}</p>
            <p><strong>Type:</strong> {preview.type}</p>
          </div>
        )}

        {/* Progress Bar */}
        {loading && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* Messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadNotePage;
