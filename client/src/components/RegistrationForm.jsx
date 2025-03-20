import React, { useState } from 'react';
import '../assets/styles/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validateName } from '../utils/validators';
import  AuthService from '../services/AuthService';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = {};

        // Validate First Name
        if (!formData.firstName || !validateName(formData.firstName)) {
            newErrors.firstName = 'First name should only contain letters.';
            valid = false;
        }

        // Validate Last Name
        if (!formData.lastName || !validateName(formData.lastName)) {
            newErrors.lastName = 'Last name should only contain letters.';
            valid = false;
        }

        // Validate Email
        if (!formData.email || !validateEmail(formData.email)) {
            newErrors.email = 'Please use a valid FDM email address.';
            valid = false;
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters and include one special character.';
            valid = false;
        }

        // Validate Password Confirmation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            valid = false;
        }
        if (valid) {
            try {
                const response = await AuthService.registerUser(formData);
                alert(response.message);
                setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
                setErrors({});
                navigate('/login');
            } catch (error) {
                alert(error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex items-center justify-center bg-[#1A1C1B]">
            <div className="login-form-container">
                <div className="flex">
                    {/* Left Section (Registration Form) */}
                    <div className="login-form-left">
                        <h2 className="text-2xl font-semibold text-white mb-6">Create an Account</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="input-field mb-4" required />
                            <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className="input-field mb-4" required />
                            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className="input-field mb-4" required />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                            {/* Password Field with Eye Icon */}
                            <div className="relative mb-4">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    className="input-field pr-10" 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-3 top-3 text-white" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                            {/* Confirm Password Field with Eye Icon */}
                            <div className="relative mb-6">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm Password" 
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    className="input-field pr-10" 
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-3 top-3 text-white" 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}

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
