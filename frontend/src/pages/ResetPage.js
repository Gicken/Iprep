import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate(); 

  const handlePasswordReset = () => {
    if (password) {
      setMessage("Password has been successfully reset.");
    } else {
      setMessage("Please enter a password.");
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
        className="border p-2 rounded mb-4"
      />
      <button 
        onClick={handlePasswordReset} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Confirm
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}

      <button 
        onClick={handleReturnToLogin} 
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
      >
        Return to Login Page
      </button>
    </div>
  );
}



