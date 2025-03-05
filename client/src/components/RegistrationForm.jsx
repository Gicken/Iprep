import React, { useState } from 'react';
import '../assets/styles/RegistrationForm.css'
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(fdm\.com|fdmgroup\.com)$/;
    return regex.test(email);
};

  const validatePassword = (password) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && specialCharRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let valid = true;
    const newErrors = { email: '', password: '', confirmPassword: '' };
  
    // Email Validation
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please use a valid FDM email address.';
      valid = false;
    }
  
    // Password Validation
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include one special character.';
      valid = false;
    }
  
    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }
  
    if (valid) {
      try {
        const response = await axios.post("http://127.0.0.1:5000/user/register", formData, {
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        alert(response.data.message); // Success message from backend
        setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }); // Reset form
        setErrors({ email: '', password: '', confirmPassword: '' }); // Clear errors
  
      } catch (error) {
        if (error.response) {
          // Backend returned an error
          alert(error.response.data.error);
        } else {
          alert("Error: Could not connect to the server.");
        }
      }
    } else {
      setErrors(newErrors);
    }
  };
  

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;