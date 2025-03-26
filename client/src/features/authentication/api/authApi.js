// =============================================================================
//                          Authentiction API
// 
//  > This file will handle all API interactions related to authentication.
// =============================================================================

import { login } from './authApi/loginApi';
import { logout } from './authApi/logoutApi';
import { registerUser } from './authApi/registerApi';
import { validateToken, resetPassword } from './authApi/tokenApi';

const authApi = {
  login,
  registerUser,
  validateToken,
  resetPassword,
  logout
};

export default authApi;