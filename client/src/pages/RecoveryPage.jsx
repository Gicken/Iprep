import { useState } from "react";
import "../assets/styles/styles.css";

export default function RecoveryPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleRecover = () => {
        setMessage("If this email exists, a recovery link has been sent.");
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
                        <p className="mt-4 text-green-500">{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}