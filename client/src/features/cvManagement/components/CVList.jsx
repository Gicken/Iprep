import React from 'react';

const CVList = ({ cvs, handleDownload, handleDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Your CVs</h3>
      {cvs.length === 0 ? (
        <p className="text-gray-500">No CVs uploaded yet</p>
      ) : (
        <ul className="space-y-3">
          {cvs.map((cv) => (
            <li key={cv.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black p-4 rounded border">
              <div className="flex flex-col">
                <span className="font-medium">{cv.file_name}</span>
                <span className="text-sm text-gray-500">Uploaded: {cv.upload_date}</span>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button onClick={() => handleDownload(cv.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">Download</button>
                <button onClick={() => handleDelete(cv.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CVList;
