import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { API_ENDPOINTS } from '../utils/constants';

const CVManager = () => {
  const [cvs, setCvs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const { setTitle } = useOutletContext();
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  

  useEffect(() => {
      setTitle("CV Management");
  });

  // Fetch CVs when component mounts
  useEffect(() => {
    fetchCVs();
  }, []);

  // Fetch CVs for the current user
  const fetchCVs = async () => {
    try {
      const token = sessionStorage.getItem('token');
      console.log("TOKEN", token);
      const response = await axios.get(`${API_ENDPOINTS.All_CVs}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });
      console.log("FETCH CVs", response);
      setCvs(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch CVs. Please try again.');
      console.error('CV fetch error:', err);
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.type;
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!validTypes.includes(fileType)) {
        setError('Please upload only PDF, DOC or DOCX files');
        setSelectedFile(null);
        return;
      }
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setError('');
    }
  };

  //Upload CV
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      const token = sessionStorage.getItem('token');
      console.log("TOKEN", token);
      const formData = new FormData();
      formData.append('file', selectedFile);
      await axios.post('http://127.0.0.1:5000/cv/upload', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess('CV uploaded successfully');
      setSelectedFile(null);
      document.getElementById("cv-file").value = "";


      // Refresh CV list
      fetchCVs();
      
      // Reset file selection
      setIsUploading(false);
      setSelectedFile(null);
      e.target.reset();
      setError('');
    } catch (err) {
      setError('Failed to upload CV. Please try again.');
      console.error('CV upload error:', err);
    }
  };

   // Handle CV deletion
  const handleDelete = async (cvId) => {
    if (!window.confirm('Are you sure you want to delete this CV?')) {
      return;
    }
    
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${API_ENDPOINTS.All_CVs}/${cvId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update local state to remove the deleted CV
      setCvs(prevCvs => prevCvs.filter(cv => cv.id !== cvId));
      setSuccess('CV deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete CV. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* CV Upload Form */}
      <form onSubmit={handleUpload} className="bg-gray-800 mb-6  p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Upload New CV</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <input
            id="cv-file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="border p-2 rounded w-full input-field"
          />
          <button
            type="submit"
            disabled={isUploading || !selectedFile}
            className={`${
              isUploading || !selectedFile 
                ? 'bg-gray-400' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-4 py-2 rounded transition`}
          >
            {isUploading ? 'Uploading...' : 'Upload CV'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX (Max size: 5MB)</p>
      </form>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* CV List */}
      <div className=" bg-gray-800 p-4 rounded shadow">
        <h3 className="text-xl  font-semibold mb-4">Your CVs</h3>
        {cvs.length === 0 ? (
          <p className="text-gray-500">No CVs uploaded yet</p>
        ) : (
          <ul className="space-y-3">
            {cvs.map((cv) => (
              <li
                key={cv.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black p-4 rounded border"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{cv.file_name}</span>
                  <span className="text-sm text-gray-500">
                    Uploaded: {cv.upload_date}
                  </span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleDelete(cv.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CVManager;