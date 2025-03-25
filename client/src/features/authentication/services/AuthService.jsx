// This file will orchestrate the authentication flow using the API and utility functions.
import authApi from '../api/authApi'
import {
  storeAuthData,
  clearAuthData,
  getCurrentUser,
  notifyLogout
} from '../../../shared/storage/authStorage'
import { decodeToken, isTokenExpired } from '../../../utils/tokenUtils'

const AuthService = {
  login: async (email, password) => {
    const response = await authApi.login(email, password)
    const token = response.data.access_token

    if (token) {
      storeAuthData(token, decodeToken(token))
      console.log('✅ Login Successful')
    }

    return response
  },

  //register service
  registerUser: async formData => {
    return authApi.registerUser(formData)
  },

  validateToken: async token => {
    return authApi.validateToken(token)
  },

  resetPassword: async (token, password) => {
    return authApi.resetPassword(token, password)
  },

  logout: () => {
    clearAuthData()
    notifyLogout()
    console.log('✅ Logout Successful')
  },

  getCurrentUser: () => {
    return getCurrentUser()
  },

  decodeToken: token => {
    return decodeToken(token)
  },

  isTokenExpired: token => {
    return isTokenExpired(token)
  }
}

export default AuthService
