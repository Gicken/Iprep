import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import authApi from '../api/authApi';
import { validateEmail, validatePassword, validateName } from '../../../utils/validators';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.firstName || !validateName(formData.firstName)) {
      newErrors.firstName = 'First name should only contain letters.';
      valid = false;
    }

    if (!formData.lastName || !validateName(formData.lastName)) {
      newErrors.lastName = 'Last name should only contain letters.';
      valid = false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please use a valid FDM email address.';
      valid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include one special character.';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    if (valid) {
      try {
        const response = await authApi.registerUser(formData);
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
    <div className="flex items-center justify-center pb-5 bg-[#1A1C1B]">
      <div className="login-form-container">
        <div className="flex">
          <RegisterForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
          <div className="login-form-right">
            <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
            <p className="mb-6">If you already have an account with us, please Sign In with your personal info</p>
            <Link to="/login">
              <button className="border border-black rounded-md py-2 px-4 hover:bg-white hover:text-black cursor-pointer transition duration-300 ease-in-out">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;