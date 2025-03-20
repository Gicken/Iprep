import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from "../services/AuthService";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                if (!token) throw new Error("Invalid token");
                const isValid = await AuthService.validateToken(token);
                setValidToken(isValid);
            } catch (err) {
                setError(err.message);
            }
        };

        checkToken();
    }, [token]);

    const handleReset = async (password) => {
        try {
            const msg = await AuthService.resetPassword(token, password);
            setMessage(`Success: ${msg}`);
            setError("");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError("An error occurred. Please try again.");
            setMessage(""); // Clear success message
            console.error(err)
        }
    };

    if (!validToken && error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    return validToken ? (
        <ResetPasswordForm
            onSubmit={handleReset}
            error={error}
            message={message}
        />
    ) : (
        <p className="text-white text-center">Validating Token...</p>
    );
}