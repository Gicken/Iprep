import React from 'react';

const FileUpload = ({ handleFileChange, handleUpload, isUploading, selectedFile }) => {
  return (
    <form onSubmit={handleUpload} className="bg-gray-800 mb-6 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Upload New CV</h3>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <input id="cv-file" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="border p-2 rounded w-full input-field" />
        <button type="submit" disabled={isUploading || !selectedFile} className={`${isUploading || !selectedFile ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded transition`}>
          {isUploading ? 'Uploading...' : 'Upload CV'}
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX (Max size: 5MB)</p>
    </form>
  );
};

export default FileUpload;
