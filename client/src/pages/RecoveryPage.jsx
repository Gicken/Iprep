import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecoveryForm from "../components/RecoveryForm";
import axios from 'axios';

export default function RecoveryPage() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRecover = async (email) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/recover/", { email });

            setMessage(response.data.message);
            setError("");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred. Please try again.");
            setMessage("");
        }
    };

    return <RecoveryForm onSubmit={handleRecover} error={error} message={message} />;
}