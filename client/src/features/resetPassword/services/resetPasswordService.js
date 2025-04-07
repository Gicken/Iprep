import { resetPasswordService as api } from "../api/recoveryApi";

export const resetPasswordService = {
    validateResetToken: async (token) => {
        return api.validateToken(token);
    },

    resetPassword: async (token, newPassword) => {
        return api.resetPassword(token, newPassword);
    }
};