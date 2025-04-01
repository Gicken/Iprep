// VoiceRecorder.js
import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaPlay } from "react-icons/fa";

const VoiceRecorder = ({ setTranscript, setAudioUrl }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrlState] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const recognitionRef = useRef(null);

    // 🎤 Start Recording & Transcribing
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];
            setIsRecording(true);

            // 🎙️ Speech Recognition Setup
            const recognition = new window.webkitSpeechRecognition(); //|| new window.SpeechRecognition();
            recognition.continuous = true; // Keep listening
            recognition.interimResults = true; // Show results while speaking
            recognition.lang = "en-US";
            recognitionRef.current = recognition;

            recognition.onresult = (event) => {
                let newTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        newTranscript += event.results[i][0].transcript + " ";
                    }
                }
                setTranscript((prev) => {
                    // Remove duplicates
                    const words = (prev + " " + newTranscript).split(" ");
                    return [...new Set(words)].join(" ");
                });
            };

            recognition.start();

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                recognition.stop();
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrlState(url);
                setAudioUrl(url);  // Passing to parent component
            };

            mediaRecorder.start();
        } catch (error) {
            console.error("Error accessing microphone", error);
        }
    };

    // 🛑 Stop Recording
    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    // 🔊 Play Recorded Audio
    const playAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return (
        <div className="flex justify-center space-x-4">
            {isRecording ? (
                <button
                    onClick={stopRecording}
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                >
                    <FaStop /> <span>Stop Recording</span>
                </button>
            ) : (
                <button
                    onClick={startRecording}
                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                >
                    <FaMicrophone /> <span>Start Recording</span>
                </button>
            )}
            {audioUrl && (
                <button
                    onClick={playAudio}
                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                >
                    <FaPlay /> <span>Play Audio</span>
                </button>
            )}
        </div>
    );
};

export default VoiceRecorder;
