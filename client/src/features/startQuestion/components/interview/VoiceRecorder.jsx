// import React, { useState, useRef } from "react";
// import { FaMicrophone, FaStop, FaPlay } from "react-icons/fa";

// const VoiceRecorder = ({ setTranscript, setAudioUrl }) => {
//     const [isRecording, setIsRecording] = useState(false);
//     const [audioUrl, setAudioUrlState] = useState(null);
//     const mediaRecorderRef = useRef(null);
//     const audioChunksRef = useRef([]);
//     const recognitionRef = useRef(null);

//     // 🎤 Start Recording & Transcribing
//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             const mediaRecorder = new MediaRecorder(stream);
//             mediaRecorderRef.current = mediaRecorder;
//             audioChunksRef.current = [];
//             setIsRecording(true);

//             // 🎙️ Speech Recognition Setup
//             const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//             if (!SpeechRecognition) {
//                 console.error("Speech recognition not supported in this browser.");
//                 return;
//             }

//             const recognition = new SpeechRecognition();
//             recognition.continuous = false; // Stop after one sentence
//             recognition.interimResults = false; // No partial results
//             recognition.lang = "en-US";
//             recognitionRef.current = recognition;

//             recognition.onresult = (event) => {
//                 const newTranscript = event.results[0][0].transcript;
//                 setTranscript(newTranscript); // ✅ Simply update transcript
//             };

//             recognition.start();

//             mediaRecorder.ondataavailable = (event) => {
//                 audioChunksRef.current.push(event.data);
//             };

//             mediaRecorder.onstop = () => {
//                 recognition.stop();
//                 const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//                 const url = URL.createObjectURL(audioBlob);
//                 setAudioUrlState(url);
//                 setAudioUrl(url);  // ✅ Pass audio URL to parent
//             };

//             mediaRecorder.start();
//         } catch (error) {
//             console.error("Error accessing microphone", error);
//         }
//     };

//     // 🛑 Stop Recording
//     const stopRecording = () => {
//         setIsRecording(false);
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//         }
//         if (recognitionRef.current) {
//             recognitionRef.current.stop();
//         }
//     };

//     // 🔊 Play Recorded Audio
//     const playAudio = () => {
//         if (audioUrl) {
//             const audio = new Audio(audioUrl);
//             audio.play();
//         }
//     };

//     return (
//         <div className="flex justify-center space-x-4">
//             {isRecording ? (
//                 <button
//                     onClick={stopRecording}
//                     className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2"
//                 >
//                     <FaStop /> <span>Stop Recording</span>
//                 </button>
//             ) : (
//                 <button
//                     onClick={startRecording}
//                     className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
//                 >
//                     <FaMicrophone /> <span>Start Recording</span>
//                 </button>
//             )}
//             {audioUrl && (
//                 <button
//                     onClick={playAudio}
//                     className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2"
//                 >
//                     <FaPlay /> <span>Play Audio</span>
//                 </button>
//             )}
//         </div>
//     );
// };

// export default VoiceRecorder;

import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaRedo } from 'react-icons/fa';

const VoiceRecorder = ({ onRecordingComplete, onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechSupported(!!SpeechRecognition);
    
    return () => {
      stopRecording();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      if (isSpeechSupported) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join(' ');
          onTranscription(transcript);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };
        
        recognitionRef.current = recognition;
        recognition.start();
      }

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        onRecordingComplete(blob);
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      startTimer();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access denied. Please allow microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    stopTimer();
  };

  const playRecording = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
          >
            <FaMicrophone className="text-xl" />
            <span>Start Recording</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
          >
            <FaStop className="text-xl" />
            <span>Stop Recording</span>
          </button>
        )}
        
        {audioBlob && (
          <button
            onClick={playRecording}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
          >
            <FaPlay className="text-xl" />
            <span>Play</span>
          </button>
        )}
      </div>
      
      {isRecording && (
        <div className="text-gray-400 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span>Recording: {formatTime(recordingTime)}</span>
          {!isSpeechSupported && (
            <span className="text-yellow-500 text-sm">
              (Speech-to-text not supported in this browser)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;