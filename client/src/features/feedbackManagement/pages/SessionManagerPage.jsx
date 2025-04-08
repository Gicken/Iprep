import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import { fetchSessions } from '../api/feedbackApi';

const SessionManagerPage = () => {
  const [sessions, setSessions] = useState([]);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  // const [selectedFeedback, setSelectedFeedback] = useState(null);
  const navigate = useNavigate();

  const { setTitle } = useOutletContext();

  // Set page title
  useEffect(() => {
    setTitle("Interview Feedback");
  }, [setTitle]);

  // Fetch sessions for user
  useEffect(() => {
    const getSessions = async () => {
      const rawSessions = await fetchSessions();
      //Sort sessions by datetime
      setSessions([...rawSessions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));   
    };
    getSessions();
  }, []);



  const openFeedbackDetails = (session_id) => {
    navigate('/dashboard/feedback/'+session_id)
    console.log("Session",session_id);
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
                    {session.job_description.title}, at {session.job_description.companyName}. Length: {session.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    Created: {session.created_at}
                  </span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => openFeedbackDetails(session.id)}
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
    </div>
  );
};

export default SessionManagerPage;