import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { fetchSessions } from '../api/feedbackApi';

const SessionManagerPage = () => {
  const [sessions, setSessions] = useState([]);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  // const [selectedFeedback, setSelectedFeedback] = useState(null);
  const { setTitle } = useOutletContext();

  // Set page title
  useEffect(() => {
    setTitle("Interview Feedback");
  }, [setTitle]);

  // Fetch sessions for user
  useEffect(() => {
    const getSessions = async () => {
      setSessions(await fetchSessions());
    };
    getSessions();
    
  }, []);



  const openFeedbackDetails = () => {
    console.log("Session",sessions[0]);
  };


  if (!sessions){
    return(
      <div>Loading</div>
    )
    }
  return (
    <div className="container mx-auto p-4">
      {/* Error Message */}
      {/* {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )} */}

      {/* Success Message */}
      {/* {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )} */}

      {/* Feedback List */}
      <div className="bg-gray-800 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Your Interview Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-500">No feedback entries yet</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map((session) => (
              <li
                key={session.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black p-4 rounded border"
              >
                <div className="flex flex-col">
                  <span className="font-medium truncate max-w-[300px]">
                    {session.job_description.title}, at {session.job_description.companyName}
                  </span>
                  <span className="text-sm text-gray-500">
                    Created: {session.created_at}
                  </span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => openFeedbackDetails()}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                  {/* <button
                    onClick={() => handleDelete(feedback.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button> */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Feedback Details Modal */}
      {/* {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Feedback Details</h2>
            <div className="mb-4">
              <strong className="block mb-2">Question:</strong>
              <p className="bg-black p-3 rounded">{selectedFeedback.question}</p>
            </div>
            <div className="mb-4">
              <strong className="block mb-2">Your Answer:</strong>
              <p className="bg-black p-3 rounded">{selectedFeedback.answer}</p>
            </div>
            <div className="mb-4">
              <strong className="block mb-2">AI Feedback:</strong>
              <div 
                className="bg-black p-3 rounded prose prose-invert"
                dangerouslySetInnerHTML={{ __html: selectedFeedback.feedback.replace(/\n/g, '<br>') }}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeFeedbackDetails}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SessionManagerPage;