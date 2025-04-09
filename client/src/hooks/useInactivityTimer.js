import { useRef, useCallback, useEffect } from "react";

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
    let seconds = 300; // Start countdown from 5 minutes (300 seconds)
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

    // Clear existing timers
    clearTimers();
    setShowLogoutWarning(false);
    setCountdown(300); // Reset countdown display (5 minutes)

    // Set new timers
    warningTimerRef.current = setTimeout(() => {
      setShowLogoutWarning(true);
      startCountdown(); // Start the 5-minute countdown
      
      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, 300000); // Logout exactly 5 minutes after warning
    }, 3300000); // Show warning at 55 minutes (3300000ms)

  }, [isAuthenticated, logout, setShowLogoutWarning, clearTimers, startCountdown, setCountdown]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return { resetInactivityTimer };
};