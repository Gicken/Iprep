import { apiClient } from '../../../../lib/constants';

export const validateToken = async (token) => {
  try {
    const response = await apiClient.get(`/recover/validate_token/${token}`);
    return response.status === 200;
  } catch (err) {
    console.error('Token validation failed:', err);
    return false;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await apiClient.post('/recover/reset-password', { token, password });
    return response.data.message;
  } catch (err) {
    console.error('Password reset failed:', err);
    throw new Error(err.response?.data?.error || 'Failed to reset password');
  }
};