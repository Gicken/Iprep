import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CVManager = () => {
  const [cvs, setCvs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  // Fetch CVs when component mounts
  useEffect(() => {
    fetchCVs();
  }, []);

  // Fetch CVs for the current user
  const fetchCVs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:5000/api/cv', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setCvs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch CVs. Please try again.');
      console.error('CV fetch error:', err);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload CV
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:5000/api/cv/upload', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh CV list
      fetchCVs();
      
      // Reset file selection
      setSelectedFile(null);
      e.target.reset();
      setError('');
    } catch (err) {
      setError('Failed to upload CV. Please try again.');
      console.error('CV upload error:', err);
    }
  };

  // Delete CV
  const handleDelete = async (cvId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:5000/api/cv/${cvId}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Refresh CV list
      fetchCVs();
      setError('');
    } catch (err) {
      setError('Failed to delete CV. Please try again.');
      console.error('CV delete error:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">CV Management</h2>
      
      {/* CV Upload Form */}
      <form onSubmit={handleUpload} className="mb-6">
        <div className="flex items-center">
          <input 
            type="file" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="mr-4"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload CV
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* CV List */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Your CVs</h3>
        {cvs.length === 0 ? (
          <p className="text-gray-500">No CVs uploaded yet</p>
        ) : (
          <ul className="space-y-2">
            {cvs.map((cv) => (
              <li 
                key={cv.id} 
                className="flex justify-between items-center bg-white p-3 rounded shadow"
              >
                <span>{cv.file_path.split('/').pop()}</span>
                <span className="text-sm text-gray-500">
                  Uploaded: {cv.upload_date}
                </span>
                <button 
                  onClick={() => handleDelete(cv.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CVManager;