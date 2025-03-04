import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CVUpload = () => {
  const navigate = useNavigate();
  const [cvFile, setCvFile] = useState(null);
  const [cvList, setCvList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch list of uploaded CVs
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    try {
      const response = await axios.get("http://127.0.0.1:5000/cvs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCvList(response.data);
    } catch (err) {
      setError("Error fetching CVs");
    }
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setError("Please select a file");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("file", cvFile);

      const response = await axios.post("http://127.0.0.1:5000/cvs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("CV uploaded successfully!");
      fetchCVs();
    } catch (err) {
      setError("Error uploading CV");
    }
  };

  const handleDelete = async (cvId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://127.0.0.1:5000/cvs/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCVs();
    } catch (err) {
      setError("Error deleting CV");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Upload CV</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleUpload} className="mt-4 p-4 bg-white rounded shadow-md">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          required
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload CV
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Uploaded CVs</h2>
        {cvList.length > 0 ? (
          <ul>
            {cvList.map((cv) => (
              <li key={cv.id} className="flex justify-between items-center mt-2">
                <span>{cv.fileName}</span>
                <button
                  onClick={() => handleDelete(cv.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No CVs uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default CVUpload;
