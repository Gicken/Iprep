import { useState } from "react";

export default function ResetPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleReset = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/recovery/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Success: ${data.message}`);
                setError(""); // Clear errors
            } else {
                setError(`Error: ${data.error}`);
                setMessage(""); // Clear success message
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            setMessage(""); // Clear success message
            console.error(err)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
            <div className="login-form-container max-w-md w-full">
                <div className="p-6 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Reset Password
                    </h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field border p-2 rounded mb-4 text-white"
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field border p-2 rounded mb-4 text-white"
                    />
                    <button
                        onClick={handleReset}
                        className="primary-button bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Reset Password
                    </button>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
}
