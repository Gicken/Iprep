import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import {isValidEmail} from "../utils/validators";
import "../assets/styles/styles.css";

export default function RecoveryPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRecover = async () => {

        if(isValidEmail(email)){
        try {
            const response = await axios.post(`${API_ENDPOINTS.RECOVER}`, { email });
                setMessage(response.data.message);  // Set the success message
                setError(null);  // Clear any previous errors
                setTimeout(() => {
                    // Redirect to the reset password page after a few seconds
                    navigate("/login");  // Ensure the path matches your reset route
                }, 2000);  // Delay for 2 seconds before redirecting
                        
        } catch (error) {
            setMessage("");  // Clear success message on error
            setError(error.response.data.error || "An error occurred");
        }
    }
    else{
        setMessage("");  
        setError("Please enter a valid email");
    }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
            <div className="login-form-container max-w-md w-full">
                <div className="p-6 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Recover Password
                    </h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field border p-2 rounded mb-4 text-white"
                    />
                    <button
                        onClick={handleRecover}
                        className="primary-button bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Recover
                    </button>
                    {message && (
                        <p className="mt-4 text-green-500 whitespace-pre-line">{message}</p>
                    )}
                    {error ? 
                        <p className="mt-4 text-red-500">{error}</p> :null
                    }
                </div>
            </div>
        </div>
    );
}
