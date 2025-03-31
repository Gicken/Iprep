import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validatePassword } from '../utils/validators';

const ResetPasswordForm = ({ onSubmit, error, message }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = () => {
        // Reset errors before validation
        setPasswordError('');
        setConfirmPasswordError('');

        // Validate password using the imported function
        const isPasswordValid = validatePassword(password);
        if (!isPasswordValid) {
            setPasswordError(
                'Password must be at least 8 characters long and contain at least one special character.'
            );
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
        }

        // Submit only if there are no errors
        if (isPasswordValid && password === confirmPassword) {
            onSubmit(password);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-[#1A1C1B]'>
            <div className='max-w-md w-full bg-[#2A2C2B] p-6 rounded-lg shadow-md border border-gray-600'>
                <h2 className='text-xl font-bold text-white text-center'>
                    Reset Password
                </h2>
                <p className='text-gray-400 text-center mb-4'>
                    Enter a new password below
                </p>

                {/* Password Field */}
                <div className='relative mb-4'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full border border-gray-600 bg-transparent text-white p-2 rounded pr-10 focus:border-[#59ff00] focus:outline-none'
                    />
                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#50e500] hover:text-[#59ff00]'
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {passwordError && (
                        <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className='relative mb-4'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Confirm new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='w-full border border-gray-600 bg-transparent text-white p-2 rounded pr-10 focus:border-[#59ff00] focus:outline-none'
                    />
                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#50e500] hover:text-[#59ff00]'
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {confirmPasswordError && (
                        <p className='text-red-500 text-sm mt-1'>{confirmPasswordError}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className='w-full bg-[#359900] text-white px-4 py-2 rounded mt-4 hover:bg-[#47cc00] transition duration-300'
                >
                    Reset Password
                </button>

                {/* Validation & Error Messages */}
                {message && (
                    <p className='mt-4 text-[#50e500] text-center'>{message}</p>
                )}
                {error && <p className='mt-4 text-[#ff5555] text-center'>{error}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordForm;