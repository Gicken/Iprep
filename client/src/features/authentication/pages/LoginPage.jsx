import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import LoginForm from '../components/LoginForm'
import { Link, useNavigate } from 'react-router-dom'
import '../../../assets/styles/global.css'
import '../../../assets/styles/features/authentication/LoginForm.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    setError(null)
    console.log("Login page submitting form...")

    console.log("Email:", email)
    console.log("Password:", password)
    

    try {
      console.log('Making login API call') 
      console.log("LoginPage: Checking AuthContext login function...", login);
      await login(email, password)
      console.log('IS USER AUTHENTICATED', isAuthenticated)
      navigate('/dashboard')
    } catch (error) {
      console.log('LoginPage: Error', error)
      setError(error.response?.data?.message || 'Invalid login credentials.')
    }
  }

  return (
    <div className='flex items-center justify-center bg-[#1A1C1B]'>
      <div className='login-form-container'>
        <div className='flex'>
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
            onSubmit={handleSubmit}
          />
          <div className='login-form-right'>
            <h2 className='text-3xl font-semibold mb-4'>Hello, Welcome!</h2>
            <p className='mb-6'>
              Don't have an account, use the button below to signup and start your journey with us
            </p>
            <Link to='/registration'>
              <button className='primary-button border border-black rounded-md py-2 px-4 hover:bg-white hover:text-black transition duration-300 ease-in-out'>
                Sign Up
              </button>
            </Link>
          </div>
          {/* <div className="login-form-right">
            <h2 className="text-3xl font-semibold mb-4">Hello, Friend!</h2>
            <p className="mb-6">Enter your personal details and start your journey with us</p>
            <Link to="/registration">
              <ButtonSecondary className='primary-button order border-white rounded-md py-2 px-4 hover:bg-white hover:text-black transition duration-300 ease-in-out'>Sign Up</ButtonSecondary>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
