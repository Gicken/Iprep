import { useRef, useCallback, useEffect } from 'react';

export const useInactivityTimer = (
  isAuthenticated,
  logout,
  setShowLogoutWarning,
  setCountdown
) => {
  const logoutTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const clearTimers = useCallback(() => {
    clearTimeout(logoutTimerRef.current);
    clearTimeout(warningTimerRef.current);
    clearInterval(countdownIntervalRef.current);
  }, []);

  const startCountdown = useCallback(() => {
    let seconds = 60;
    setCountdown(seconds);
    
    countdownIntervalRef.current = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      
      if (seconds <= 0) {
        clearInterval(countdownIntervalRef.current);
      }
    }, 1000);
  }, [setCountdown]);

  const resetInactivityTimer = useCallback(() => {
    if (!isAuthenticated) return;

    // Clear any existing timers
    clearTimers();
    setShowLogoutWarning(false);
    setCountdown(60); // Reset countdown display

    // Set new timers
    warningTimerRef.current = setTimeout(() => {
      setShowLogoutWarning(true);
      startCountdown(); // Start the visual countdown
      
      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, 60000); // 1 minute until actual logout
    }, 60000); // 1 minute until warning shows
  }, [isAuthenticated, logout, setShowLogoutWarning, clearTimers, startCountdown, setCountdown]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return { resetInactivityTimer };
};