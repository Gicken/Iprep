import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import ResetForm from "../components/ResetForm";
import { useReset } from "../hooks/useReset";

export default function ResetPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { 
        validToken, 
        error, 
        message, 
        isValidating,
        validateToken, 
        resetPassword,
        setError
    } = useReset();

    // Extract token from URL (supports both query param and path formats)
    const getTokenFromUrl = () => {
        // Try to get from query params first
        const queryParams = new URLSearchParams(location.search);
        const queryToken = queryParams.get('token');
        
        // If not in query params, try to get from path
        if (!queryToken && location.pathname.includes('/validate_token/')) {
            return location.pathname.split('/validate_token/')[1];
        }
        
        return queryToken;
    };

    const token = getTokenFromUrl();

    useEffect(() => {
        if (token && validToken === null) {
            validateToken(token);
        }
    }, [token, validToken, validateToken]);

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
                <div className="max-w-md w-full bg-[#2A2C2B] p-6 rounded-lg shadow-md border border-gray-600">
                    <p className="text-red-500 text-center">Reset token is missing from URL</p>
                </div>
            </div>
        );
    }

    if (isValidating) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
                <div className="max-w-md w-full bg-[#2A2C2B] p-6 rounded-lg shadow-md border border-gray-600">
                    <p className="text-white text-center">Validating token...</p>
                </div>
            </div>
        );
    }

    if (validToken === false) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
                <div className="max-w-md w-full bg-[#2A2C2B] p-6 rounded-lg shadow-md border border-gray-600">
                    <p className="text-red-500 text-center">
                        {error || "Invalid or expired reset token"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <ResetForm
            onSubmit={(password) => {
                if (token) {
                    resetPassword(token, password, navigate);
                } else {
                    setError("Token is missing");
                }
            }}
            error={error}
            message={message}
        />
    );
}