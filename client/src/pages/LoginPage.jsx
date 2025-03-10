import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/styles.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    console.log('Login form submitted:', { email, password });
    console.log('Checking if login function is available:', login);

    try {
      const response = await login(email, password);
      console.log('LoginPage: login', response);
      navigate('/dashboard');
    } catch (error) {
      console.log('LoginPage: Error', error);
      setError(error.response?.data?.message || 'Invalid login credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
      <div className="login-form-container">
        <div className="flex">
          {/* Left Section (Login Form) */}
          <div className="login-form-left">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">Sign in to I-Prep</h2>
            </div>
            <div className="flex space-x-4 mb-6">
              <button className="social-button">f</button>
              <button className="social-button">G</button>
              <button className="social-button">In</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
              <div className="flex justify-between items-center mb-6">
              <Link to="/recovery" className="forgot-password">Forgot your password?</Link>
              </div>
              <button type="submit" className="primary-button">SIGN IN</button>
            </form>
          </div>

          {/* Right Section (Greeting) */}
          <div className="login-form-right">
            <h2 className="text-3xl font-semibold mb-4">Hello, Friend!</h2>
            <p className="mb-6">Enter your personal details and start your journey with us</p>
            <Link to="/registration"><button className="border border-white rounded-md py-2 px-4 hover:bg-white hover:text-black transition duration-300 ease-in-out">
              Sign Up
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

