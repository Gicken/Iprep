import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/styles.css';
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(fdm\.com|fdmgroup\.com)$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    let valid = true;

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please use a valid FDM email address';
      valid = false;
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be 8+ characters with a special character';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (valid) {
      try {
        await axios.post("http://127.0.0.1:5000/user/register", formData, {
          headers: { "Content-Type": "application/json" }
        });
        navigate('/dashboard');
      } catch (error) {
        alert(error.response?.data?.error || 'Error registering');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
      <div className="login-form-container">
        <div className="flex">
          {/* Left Section (Form) */}
          <div className="login-form-left">
            <h2 className="text-2xl font-semibold text-white mb-6">Create an Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4"><input type="text" name="firstName" placeholder="First Name" className="input-field" value={formData.firstName} onChange={handleChange} required/></div>
              <div className="mb-4"><input type="text" name="lastName" placeholder="Last Name" className="input-field" value={formData.lastName} onChange={handleChange} required/></div>
              <div className="mb-4"><input type="email" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} required/></div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <div className="mb-4"><input type="password" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange} required/></div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              <div className="mb-4"><input type="password" name="confirmPassword" placeholder="Confirm Password" className="input-field" value={formData.confirmPassword} onChange={handleChange} required/></div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              <button type="submit" className="primary-button">Sign Up</button>
            </form>
          </div>

          {/* Right Section (Greeting) */}
          <div className="login-form-right flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-3xl font-semibold mb-4">Welcome Aboard!</h2>
            <p className="mb-6">Join us today and start your journey with I-Prep.</p>
            <Link to="/login">
              <button className="border border-white rounded-md py-2 px-4 hover:bg-white hover:text-black transition duration-300 ease-in-out">Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
