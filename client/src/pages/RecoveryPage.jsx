import { useState } from "react";

export default function RecoveryPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleRecover = () => {
        setMessage("If this email exists, a recovery link has been sent.");
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Recover Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded mb-4"
            />
            <button onClick={handleRecover} className="bg-blue-500 text-white px-4 py-2 rounded">
                Recover
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
}