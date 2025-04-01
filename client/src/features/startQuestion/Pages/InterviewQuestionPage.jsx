
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import VoiceRecorder from "../components/interview/VoiceRecorder";
import Transcription from "../components/interview/Transcription";
import ChatInterface from "../components/interview/ChatInterface";
import ToggleVisibilityButton from "../components/interview/ToggleVisibilityButton";
import axios from "axios";
import { API_ENDPOINTS } from "../lib/constants";


const InterviewQuestionPage = () => {

    const sessionID = sessionStorage.getItem('sessionID')
    const { setTitle } = useOutletContext();
    const [transcript, setTranscript] = useState("");
    const [audioUrl, setAudioUrl] = useState(null);
    const [isVisible, setIsVisible] = useState(true); // Toggle for transcription & chat
    const [isAnswerComplete, setIsAnswerComplete] = useState(false); // For locking the answer
    const [session, setSession] = useState();

const getSession = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${API_ENDPOINTS.GET_SESSION}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      setSession(response.data);
      console.log("response")
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.error("CV fetch error:", err);
      return [];
    }
  };

  useEffect(() => {
      setTitle("Practice Interview");
  }, [setTitle]);

  useEffect(() => {
    getSession(sessionID);
}, [sessionID]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = () => {
    // console.log(session)

      // Handle the submission of the transcript (e.g., sending it to the backend)
      console.log("Submitting response:", transcript);
  };

  const handleCompleteAnswer = () => {
      // Lock the answer and mark it as complete
      setIsAnswerComplete(true);
      // Send the response (text + audio) to backend for evaluation
      console.log("Answer Completed:", transcript, audioUrl);
  };


  if (!session || !session.questions || session.questions.length === 0) {
    return <div>Loading...</div>; // Or some other loading UI
  }
  sessionStorage.setItem("question_id",session["questions"][0]["id"])

  return (
      <div className="container mx-auto p-4">
          {/* Current Interview Question */}
          <div className="bg-gray-800 p-6 rounded shadow mb-4">
              <h2 className="text-xl font-semibold mb-2">
                  Question: {session["questions"][0]["question_text"]}
              </h2>
          </div>

          {/* Voice Recorder */}
          <div className="bg-gray-800 p-6 rounded shadow text-center mb-4">
              <h2 className="text-xl font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
                  Voice Input
              </h2>
              <VoiceRecorder setTranscript={setTranscript} setAudioUrl={setAudioUrl} />
          </div>

          {/* Toggle Visibility Button */}
          <ToggleVisibilityButton isVisible={isVisible} toggleVisibility={toggleVisibility} />

          {/* Transcription and Chat */}
          {isVisible && (
              <div>
                  <Transcription transcript={transcript} />
                  <ChatInterface
                      transcript={transcript}
                      setTranscript={setTranscript}
                      handleSubmit={handleSubmit}
                  />
              </div>
          )}

          {/* Complete Answer Button */}
          <div className="flex justify-center space-x-4 mt-6">
              <button
                  onClick={handleCompleteAnswer}
                  disabled={isAnswerComplete}
                  className={`bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2 ${
                      isAnswerComplete ? "cursor-not-allowed opacity-50" : ""
                  }`}
              >
                  Complete Answer
              </button>
          </div>
      </div>
  );
};

export default InterviewQuestionPage;
