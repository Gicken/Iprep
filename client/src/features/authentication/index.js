// For encapsulation purposes and clear folder structure, this file serves as
// the public interface for our authentication feature.

// Export the authentication API
export { default as authApi } from './api/authApi';

// Export reusable components
export { default as RegisterForm } from './components/RegisterForm';
export { default as LoginForm } from './components/LoginForm';

// Export hooks
export { useAuth } from './hooks/useAuth';

// Export the main authentication pages
export { default as RegisterPage } from './pages/RegistrationPage';
export { default as LoginPage } from './pages/LoginPage';

// Export services
export { default as AuthService } from './services/AuthService';

// Export storage utilities (named exports)
export { 
  storeAuthData,
  clearAuthData,
  getCurrentUser,
  notifyLogout
} from '../../shared/storage/authStorage';