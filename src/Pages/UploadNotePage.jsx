import React, { useState } from "react";
import { uploadNote } from "../services/notesService";
import "./UploadNotesPage.css";

const UploadNotePage = () => {

  const [formData, setFormData] = useState({
    school: "",
    category: "past_paper",
    year: "",
    semester: "",
    courseCode: "",
    courseTitle: "",
    examYear: "",
  });

  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // file select
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    e.target.value = null;
  };

  // drag drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // remove file
  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0)
      return setError("Please select at least one file");

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      files.forEach(file => {
        data.append("files", file);
      });

      await uploadNote(data, setUploadProgress);

      setSuccess("Uploaded and combined into PDF successfully");

      setFiles([]);
      setFormData({
        school: "",
        category: "past_paper",
        year: "",
        semester: "",
        courseCode: "",
        courseTitle: "",
        examYear: "",
      });
    }
    catch (err) {
      setError(err.message || "Upload failed");
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="upload-container">

      <h2 className="page-title">
        Upload Past Papers <span />
      </h2>

      <form className="upload-form" onSubmit={handleSubmit}>

        {/* Row 1: School + Exam Year */}
        <div className="form-grid">
          <div className="select-wrap">
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
              <option value="School of Engineering">School of Engineering</option>
            </select>
          </div>

          <input
            type="number"
            name="examYear"
            placeholder="Year of Examination e.g. 2023"
            value={formData.examYear}
            onChange={handleChange}
            min="1990"
            max={new Date().getFullYear()}
            required
          />
        </div>

        {/* Row 2: Year + Semester + Course Code */}
        <div className="form-grid-3">
          <div className="select-wrap">
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Year</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>
          </div>

          <div className="select-wrap">
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          <input
            type="text"
            name="courseCode"
            placeholder="Course Code"
            value={formData.courseCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Row 3: Course Title (full width) */}
        <input
          type="text"
          name="courseTitle"
          placeholder="Course Title"
          value={formData.courseTitle}
          onChange={handleChange}
          required
        />

        {/* Drop Zone */}
        <div
          className="file-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <svg className="dropzone-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p>Drag and drop files here</p>
          <p>or click to browse — images &amp; PDFs accepted</p>
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="file-preview">
            <h4>Selected files ({files.length})</h4>
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <button type="button" onClick={() => removeFile(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Progress */}
        {loading && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: uploadProgress + "%" }}
            />
          </div>
        )}

        {/* Messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Uploading…" : "Upload"}
        </button>

      </form>
    </div>
  );
};

export default UploadNotePage;