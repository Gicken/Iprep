// This file will handle session and local storage interactions.

import { decodeToken, isTokenExpired } from '../../utils/tokenUtils'

export const storeAuthData = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const clearAuthData = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const token = sessionStorage.getItem('token');
  if (!token || isTokenExpired(token)) return null;

  return decodeToken(token);
};

export const notifyLogout = () => {
  localStorage.setItem('logout', Date.now());
};