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



      // form fields

      Object.keys(formData).forEach(key => {

        data.append(key, formData[key]);

      });



      // append all files

      files.forEach(file => {

        data.append("files", file);

      });



      await uploadNote(data, setUploadProgress);



      setSuccess("Uploaded and combined into PDF successfully");



      setFiles([]);

      setFormData({

        school: "",
        category: "",
        year: "",
        semester: "",
        courseCode: "",
        courseTitle: "",
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

        Upload Notes or Past Paper

      </h2>



      <form
        className="upload-form"
        onSubmit={handleSubmit}
      >



{/* school */}

<select
name="school"
value={formData.school}
onChange={handleChange}
required
>

<option value="">Select School</option>

<option value="School of Education">
School of Education
</option>

<option value="School of Arts">
School of Arts
</option>

<option value="School of Science">
School of Science
</option>

<option value="School of Information Sciences">
School of Information Sciences
</option>

<option value="School of Engineering">
School of Engineering
</option>

</select>




{/* category */}

<select
name="category"
value={formData.category}
onChange={handleChange}
required
>

<option value="">Category</option>

<option value="note">Note</option>

<option value="past_paper">
Past Paper
</option>

</select>




{/* year */}

<select
name="year"
value={formData.year}
onChange={handleChange}
required
>

<option value="">Year</option>

<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>

</select>




{/* semester */}

<select
name="semester"
value={formData.semester}
onChange={handleChange}
required
>

<option value="">Semester</option>

<option value="1">1</option>

<option value="2">2</option>

</select>




{/* course code */}

<input
type="text"
name="courseCode"
placeholder="Course Code"
value={formData.courseCode}
onChange={handleChange}
required
/>




{/* course title */}

<input
type="text"
name="courseTitle"
placeholder="Course Title"
value={formData.courseTitle}
onChange={handleChange}
required
/>




{/* DROP ZONE */}

<div

className="file-dropzone"

onDrop={handleDrop}

onDragOver={handleDragOver}

>

<p>

Drag and drop files here

</p>

<p>

or click to select

</p>



<input

type="file"

multiple

accept="image/*,application/pdf"

onChange={handleFileChange}

/>

</div>




{/* FILE LIST */}

{

files.length > 0 && (

<div className="file-preview">

<h4>

Selected files

</h4>



{

files.map((file, index) => (

<div key={index}

className="file-item">

<span>

{file.name}

</span>



<button

type="button"

onClick={() =>
removeFile(index)
}

>

Remove

</button>

</div>

))

}

</div>

)

}




{/* progress */}

{

loading && (

<div className="progress-bar">

<div

className="progress-fill"

style={{
width: uploadProgress + "%"
}}

>

</div>

</div>

)

}




{/* messages */}

{

error &&

<p className="error-message">

{error}

</p>

}



{

success &&

<p className="success-message">

{success}

</p>

}




<button
type="submit"
disabled={loading}
>

{

loading

? "Uploading..."

: "Upload"

}

</button>




</form>

</div>

);

};

export default UploadNotePage;
