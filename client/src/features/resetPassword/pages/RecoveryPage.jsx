import React from "react";
import { useNavigate } from "react-router-dom";
import RecoveryForm from "../components/RecoveryForm";
import { useRecovery } from '../hooks/useRecovery';

export default function RecoveryPage() {
    const navigate = useNavigate();
    const { message, error, isLoading, recoverPassword } = useRecovery();

    return (
        <RecoveryForm 
            onSubmit={(email) => recoverPassword(email, navigate)} 
            error={error} 
            message={message}
            isLoading={isLoading}
        />
    );
}