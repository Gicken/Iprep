import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { fetchCVs, uploadCV, deleteCV, downloadCV } from '../api/cvAPI';
import FileUpload from '../components/FileUpload';
import CVList from '../components/CVList';

const CVManager = () => {
  const [cvs, setCvs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle("CV Management");
    fetchCVs(setCvs, setError);
  }, [setTitle]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    await uploadCV(selectedFile, setIsUploading, setSuccess, setError, setSelectedFile, fetchCVs, setCvs);
  };

  const handleDelete = async (cvId) => {
    await deleteCV(cvId, setCvs, setSuccess, setError);
  };

  const handleDownload = async (cvId) => {
    await downloadCV(cvId, setError);
  };

  return (
    <div className="container mx-auto p-4">
      <FileUpload handleFileChange={handleFileChange} handleUpload={handleUpload} isUploading={isUploading} selectedFile={selectedFile} />
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{success}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
      <CVList cvs={cvs} handleDownload={handleDownload} handleDelete={handleDelete} />
    </div>
  );
};

export default CVManager;
