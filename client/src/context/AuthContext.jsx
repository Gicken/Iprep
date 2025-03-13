import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => Promise.resolve(),
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  const logoutTimerRef = useRef(null);
  const warningTimerRef = useRef(null);

  const logout = useCallback(() => {
    console.log("🔴 LOGOUT FUNCTION CALLED FROM:", new Error().stack);
    console.log("Logging out...");
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setShowLogoutWarning(false);

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    clearTimeout(logoutTimerRef.current);
    clearTimeout(warningTimerRef.current);

    // Sync logout across tabs
    localStorage.setItem("logout", Date.now());
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (!isAuthenticated) return;

    clearTimeout(logoutTimerRef.current);
    clearTimeout(warningTimerRef.current);
    setShowLogoutWarning(false);

    warningTimerRef.current = setTimeout(() => {
      setShowLogoutWarning(true);
      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, 60000); // 1 min after warning
    }, 60000); // 1 min inactivity before warning
  }, [logout, isAuthenticated]);

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      // console.log("✅ checAuthentication: User authenticated:", isAuthenticated);

      const storedToken = sessionStorage.getItem("token");

      if (storedToken) {
        const user = AuthService.decodeToken(storedToken);
        const isExpired = AuthService.isTokenExpired(storedToken);
        console.log("DEBUGGING: checAuthentication if storedUser: ", user);

        if (!isExpired) {
          setUser(user);
          setIsAuthenticated(true);
          resetInactivityTimer();
          setLoading(false);
          console.log("✅ checAuthentication: User authenticated:", user);
          return;
        }else{
          console.log("❌ checAuthentication: Token expired");
          logout();
        }
      }
      // logout();
      setLoading(false);
    };

    checkAuthentication();
  }, [logout, resetInactivityTimer]);

  useEffect(() => {
    const handleActivity = () => resetInactivityTimer();

    if (isAuthenticated) {
      resetInactivityTimer();
    }
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearTimeout(logoutTimerRef.current);
      clearTimeout(warningTimerRef.current);
    };
  }, [isAuthenticated, resetInactivityTimer]);

  useEffect(() => {
    // Sync logout across tabs
    const syncLogout = (event) => {
      if (event.key === "logout") logout();
    };

    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, [logout]);

  const login = async (email, password) => {
    try {
      console.log("🔴DEBUGGING: AuthContext.Login is reached: ", email, password)
      const response = await AuthService.login(email, password);
      console.log("🔴DEBUGGING: AuthContext.Login response: ", response)
      if (response?.data?.access_token) {
        const token = response.data.access_token;
        const user = AuthService.decodeToken(token);


        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);

        setIsAuthenticated(true);
        setUser(user);
        resetInactivityTimer();

        console.log("✅ Login successful, user set:", user);
        return response;
      }
      throw new Error("Invalid login response");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        showLogoutWarning,
      }}
    >
      {children}
      {showLogoutWarning && (
        <div className="logout-warning">
          <p>You will be logged out due to inactivity.</p>
          <button onClick={resetInactivityTimer}>Stay Logged In</button>
        </div>
      )}
      
    </AuthContext.Provider>
    
  );
};

export { AuthContext, AuthProvider };
