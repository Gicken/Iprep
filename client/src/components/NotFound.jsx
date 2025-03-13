import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "../assets/images/3.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen px-6">
      {/* Left: Error Image */}
      <div className="flex-1 flex justify-center">
        <img src={errorImage} alt="404 Not Found" style={{ width: "500px", height: "50rem", objectFit: "contain" }} />
      </div>

      {/* Right: Error Message & Button */}
      <div className="flex-1 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-300 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-black font-semibold py-3 px-6 rounded-lg shadow-lg transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

