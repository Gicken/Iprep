// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../assets/styles/styles.css";
// import axios from 'axios'; // Import Axios

// export default function RecoveryPage() {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleRecover = async () => {
//         try {
//             const response = await axios.post("http://127.0.0.1:5000/recover/", { email }); // Use Axios post

//             setMessage(response.data.message);
//             setError("");
//             setTimeout(() => {
//                 navigate("/");
//             }, 2000);
//         } catch (err) {
//             if (err.response) {
//                  // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 setError(`Error: ${err.response.data.error}`);
//             } else if (err.request) {
//                 // The request was made but no response was received
//                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                 // http.ClientRequest in node.js
//                 setError("Network error. Please try again.");
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 setError("An unexpected error occurred.");
//             }
//             console.error("Axios Error: ", err);
//             setMessage("");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
//             <div className="login-form-container max-w-md w-full">
//                 <div className="p-6 flex flex-col items-center">
//                     <h2 className="text-xl font-bold mb-4 text-white">
//                         Recover Password
//                     </h2>
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="input-field border p-2 rounded mb-4 text-white"
//                     />
//                     <button
//                         onClick={handleRecover}
//                         className="primary-button bg-blue-500 text-white px-4 py-2 rounded"
//                     >
//                         Recover
//                     </button>
//                     {message && (
//                         <p className="mt-4 text-green-500 whitespace-pre-line">{message}</p>
//                     )}
//                     {error && (
//                         <p className="mt-4 text-red-500">{error}</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecoveryForm from "../components/RecoveryForm";
import axios from 'axios';

export default function RecoveryPage() {
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
