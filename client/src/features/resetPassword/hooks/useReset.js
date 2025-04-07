import { useState, useCallback } from "react";
import { resetPasswordService } from "../api/recoveryApi";

export const useReset = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [validToken, setValidToken] = useState(null); // null = not checked yet
    const [isValidating, setIsValidating] = useState(false);

    const validateToken = useCallback(async (token) => {
        setIsValidating(true);
        setError("");
        try {
            if (!token) throw new Error("Token is missing");
            
            const isValid = await resetPasswordService.validateToken(token);
            setValidToken(isValid);
            
            // Only set error if explicitly false (not null/undefined)
            if (isValid === false) {
                setError("Invalid or expired token");
            }
            return isValid;
        } catch (err) {
            setError(typeof err.message === 'string' ? err.message : "Token validation failed");
            setValidToken(false);
            return false;
        } finally {
            setIsValidating(false);
        }
    }, []);

    const resetPassword = useCallback(async (token, password, navigate) => {
        try {
            setError("");
            setMessage("");
            const response = await resetPasswordService.resetPassword(token, password);
            setMessage(typeof response?.message === 'string' ? response.message : "Password reset successful");
            // Ensure navigate exists before calling
            if (navigate && typeof navigate === 'function') {
                setTimeout(() => navigate('/login'), 2000);
            }
            return true;
        } catch (err) {
            setError(typeof err.message === 'string' ? err.message : "Password reset failed");
            return false;
        }
    }, []);

    return { 
        validToken, 
        error, 
        message, 
        isValidating,
        validateToken, 
        resetPassword 
    };
};