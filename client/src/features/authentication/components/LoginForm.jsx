import React from 'react'
import { Link } from 'react-router-dom'
import { ShowPasswordToggle } from '../../../shared/components/Buttons'
import ButtonPrimary from '../../../shared/components/Buttons/PrimaryButton'
import '../../../assets/styles/features/authentication/LoginForm.css'

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  onSubmit
}) => {
  return (
    <div className='login-form-left'>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold text-white text-center'>Sign in to iPrep</h2>
        <hr/>
      </div>
      <div className='flex space-x-4 mb-6'>
        <h1>Welcome back, enter your details below to continue.</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <input
            type='email'
            placeholder='Email'
            className='input-field'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='relative mb-6'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='input-field pr-10'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <ShowPasswordToggle
            showPassword={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {error && <div className='text-red-500 text-sm mb-4'>{error}</div>}
        <div className='flex justify-between items-center mb-6'>
          <Link to='/recovery' className='forgot-password'>
            Forgot your password?
          </Link>
        </div>
        <ButtonPrimary type='submit'>SIGN IN</ButtonPrimary>
      </form>
    </div>
  )
}

export default LoginForm
