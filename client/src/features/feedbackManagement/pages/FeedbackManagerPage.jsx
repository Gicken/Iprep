import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { fetchSessionByID } from '../api/feedbackApi';


const FeedbackManagerPage = () => {
  const [session, setSession] = useState(null);
  const { setTitle } = useOutletContext();
  const [selectedQuestion,setSelectedQuestion] = useState(null);

  let pathName = window.location.pathname;
  let sessionId = pathName.split('/').pop();

  // Set page title
  useEffect(() => {
    setTitle("Interview Feedback");
  }, [setTitle]);

   useEffect(() => {
      const getSession = async () => {
        setSession(await fetchSessionByID(sessionId));
      };
      getSession();
      console.log("sessionL",session)
    }, []);


  // Open feedback details modal
  const openFeedbackDetails = (question) => {
    console.log(session.questions[0].response[0])
    setSelectedQuestion(question);
  };

  // Close feedback details modal
  const closeFeedbackDetails = () => {
    setSelectedQuestion(null);
  };

  
  if (!session){
    return(
      <div>Loading</div>
    )
    }
      
  return (
    <div className="container mx-auto p-4">

      {/* Feedback List */}
      <div className="bg-gray-800 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Feedback by Question</h3>
        {session.length === 0 ? (
          <p className="text-gray-500">No feedback entries yet</p>
        ) : (
          <ul className="space-y-3">
            {session.questions.map((question) => (
              <li
                key={question.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black p-4 rounded border"
              >
                <div className="flex flex-col">
                  <span className="font-medium truncate max-w-[300px]">
                   {question.question_text}
                  </span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => openFeedbackDetails(question)}
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
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Feedback Details</h2>
            <div className="mb-4">
              <strong className="block mb-2">Question:</strong>
              <p className="bg-black p-3 rounded">{selectedQuestion.question_text}</p>
            </div>
            <div className="mb-4">
              <strong className="block mb-2">Your Answer:</strong>
              <p className="bg-black p-3 rounded">{selectedQuestion.response[0].text}</p>
            </div>
            <div className="mb-4">
              <strong className="block mb-2">Strengths:</strong>
              <p className="bg-black p-3 rounded prose prose-invert">{selectedQuestion.response[0].feedback[0].strength[0]}</p>
            </div>
            <div className="mb-4">
              <strong className="block mb-2">Improve:</strong>
              <p className="bg-black p-3 rounded prose prose-invert">{selectedQuestion.response[0].feedback[0].improve[0]}</p>
            </div>
            <div className="mb-4">
              <strong className="block mb-2">Recommendation:</strong>
              <p className="bg-black p-3 rounded prose prose-invert">{selectedQuestion.response[0].feedback[0].recommendation[0]}</p>
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
      )}
    </div>
  );
};

export default FeedbackManagerPage;