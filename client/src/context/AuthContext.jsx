import React, { createContext, useState, useEffect, useCallback } from 'react'
import { authApi, useAuth } from '../features/authentication'
import LogoutWarning from '../shared/components/LogoutWarning'
import { useInactivityTimer } from '../hooks/useInactivityTimer'
import { useLogoutSync } from '../hooks/useLogoutSync'
import { decodeToken, isTokenExpired } from '../utils/tokenUtils'

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => Promise.resolve(),
  logout: () => {},
  showLogoutWarning: false,
  countdown: 60
})

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showLogoutWarning, setShowLogoutWarning] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const memoizedCallback = useCallback(() => {}, [])

  const { logout } = useAuth(
    setIsAuthenticated,
    setUser,
    setShowLogoutWarning,
    memoizedCallback
  )

  const { resetInactivityTimer } = useInactivityTimer(
    isAuthenticated,
    logout,
    setShowLogoutWarning,
    setCountdown
  )

  useLogoutSync(logout)

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true)
      const storedToken = sessionStorage.getItem('token')

      if (storedToken) {
        const user = decodeToken(storedToken)
        const isExpired = isTokenExpired(storedToken)

        if (!isExpired) {
          setUser(user)
          setIsAuthenticated(true)
          resetInactivityTimer()
        } else {
          logout()
        }
      }
      setLoading(false)
    }

    checkAuthentication()
  }, [logout, resetInactivityTimer])

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password)

      if (response?.data?.access_token) {
        const token = response.data.access_token
        const user = decodeToken(token)

        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('token', token)

        setIsAuthenticated(true)
        setUser(user)
        resetInactivityTimer()
        return response
      }
      throw new Error('Invalid login response')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
    showLogoutWarning,
    countdown
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <LogoutWarning
        isOpen={showLogoutWarning}
        countdown={countdown}
        onStayLoggedIn={resetInactivityTimer}
        onClose={() => setShowLogoutWarning(false)}
      />
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
