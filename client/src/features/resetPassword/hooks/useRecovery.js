import { useState, useCallback } from "react";
import { recoveryService } from "../api/recoveryApi";

export const useRecovery = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const recoverPassword = useCallback(async (email, navigate) => {
        setIsLoading(true);
        setError("");
        setMessage("");
        
        try {
            const response = await recoveryService.sendRecoveryEmail(email);
            setMessage(response.message || "Recovery email sent successfully");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(typeof err === 'string' ? err : 
                   err.response?.data?.error || 
                   "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { message, error, isLoading, recoverPassword };
};