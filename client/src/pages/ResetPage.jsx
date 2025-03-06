import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState("");  
  const navigate = useNavigate(); 

  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && specialCharRegex.test(password);
  };

  const handlePasswordReset = () => {
    if (!password) {
      setError("Please enter a password.");
      setMessage("");
    } else if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain at least 1 special character.");
      setMessage("");
    } else {
      setError("");
      setMessage("Password has been successfully reset.");
      // Add actual password reset logic here (e.g., API call)
    }
  };

  const handleReturnToLogin = () => {
    navigate("/login"); 
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <button 
        onClick={handlePasswordReset} 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Confirm
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}
      {message && <p className="mt-2 text-green-500">{message}</p>}

      <button 
        onClick={handleReturnToLogin} 
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
      >
        Return to Login Page
      </button>
    </div>
  );
}



