import React, { useState } from 'react';
import '../assets/styles/styles.css';
import { Link, useNavigate } from 'react-router-dom';
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateName = (name) => {
        const regex = /^[A-Za-z]+$/;  // Regex to allow only alphabets
        return regex.test(name);
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
        const newErrors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        // Validate First Name
        if (!formData.firstName || !validateName(formData.firstName)) {
            newErrors.firstName = 'First name should only contain alphabets.';
            valid = false;
        }

        // Validate Last Name
        if (!formData.lastName || !validateName(formData.lastName)) {
            newErrors.lastName = 'Last name should only contain alphabets.';
            valid = false;
        }

        // Validate Email
        if (!formData.email || !validateEmail(formData.email)) {
            newErrors.email = 'Please use a valid FDM email address.';
            valid = false;
        }

        // Validate Password
        if (!formData.password || !validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and include one special character.';
            valid = false;
        }

        // Validate Password Confirmation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            valid = false;
        }

        if (valid) {
            try {
                const response = await axios.post("http://127.0.0.1:5000/register/", formData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                alert(response.data.message);
                setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
                setErrors({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
                navigate('/login');

            } catch (error) {
                if (error.response) {
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
        <div className="flex items-center justify-center min-h-screen bg-[#1A1C1B]">
            <div className="login-form-container">
                <div className="flex">
                    {/* Left Section (Registration Form) */}
                    <div className="login-form-left">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-white">Create an Account</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    placeholder="First Name" 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                    className="input-field" 
                                    required 
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                    className="input-field" 
                                    required 
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                            <div className="mb-4">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    className="input-field" 
                                    required 
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    className="input-field" 
                                    required 
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                            <div className="mb-6">
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    className="input-field" 
                                    required 
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>
                            <button type="submit" className="primary-button">SIGN UP</button>
                        </form>
                    </div>

                    {/* Right Section (Greeting) */}
                    <div className="login-form-right">
                        <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
                        <p className="mb-6">If you already have an account with us, please Sign In with your personal info</p>
                        <Link to="/login">
                            <button className="border border-white rounded-md py-2 px-4 hover:bg-white hover:text-black transition duration-300 ease-in-out">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
