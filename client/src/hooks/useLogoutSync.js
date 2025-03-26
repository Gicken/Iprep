// =============================================================================
//                          Use Logout Sync
// 
//  > This hook will handle the cross-tab logout synchronization logic.
// =============================================================================

import { useEffect } from 'react';

export const useLogoutSync = (logout) => {
  useEffect(() => {
    console.log('useLogoutSync: useEffect triggered');

    const syncLogout = (event) => {
      if (event.key === 'logout') {
        console.log('useLogoutSync: Logging out due to storage event');
        logout();
      }
    };

    window.addEventListener('storage', syncLogout);

    return () => {
      console.log('useLogoutSync: Removing event listener');
      window.removeEventListener('storage', syncLogout);
    };
  }, [logout]);
};