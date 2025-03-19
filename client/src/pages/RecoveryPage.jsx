// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../assets/styles/styles.css";

// export default function RecoveryPage() {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleRecover = async () => {
//         try {
//             const response = await fetch("http://127.0.0.1:5000/recovery/", {  // Correct API URL
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email }),  // Email value passed correctly
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setMessage(data.message);  // Set the success message
//                 setError("");  // Clear any previous errors
//                 setTimeout(() => {
//                     // Redirect to the reset password page after a few seconds
//                     navigate("/reset");  // Ensure the path matches your reset route
//                 }, 2000);  // Delay for 2 seconds before redirecting
//             } else {
//                 setError(`Error: ${data.error}`);  // Show the error message if there's any
//                 setMessage("");  // Clear the success message
//             }
//         } catch (err) {
//             setError("An error occurred. Please try again.");
//             setMessage("");  // Clear success message on error
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
