// =============================================================================
//                          Use Authentication Sync
//
//  > This hook will handle the logout logic.
// =============================================================================

import { useCallback } from 'react';

export const useAuth = (setIsAuthenticated, setUser, setShowLogoutWarning, callback) => {
  const logout = useCallback(() => {
    console.log('Logout function called');
    console.log('Logging out...');
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    setShowLogoutWarning(false);
    callback?.();

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    localStorage.setItem('logout', Date.now());
  }, [setIsAuthenticated, setUser,setShowLogoutWarning,callback]);
  return { logout };
};

