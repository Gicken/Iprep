import React from 'react'
import ShowPasswordToggle from '../../../shared/components/Buttons/ShowPasswordToggle'
import ButtonPrimary from '../../../shared/components/Buttons/PrimaryButton'

const RegisterForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  return (
    <div className='login-form-left'>
      <h2 className='text-2xl font-semibold text-white mb-6'>
        Create an Account
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='First Name'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
          className='input-field mb-4'
          required
        />
        {errors.firstName && (
          <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>
        )}

        <input
          type='text'
          placeholder='Last Name'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
          className='input-field mb-4'
          required
        />
        {errors.lastName && (
          <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>
        )}

        <input
          type='email'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='input-field mb-4'
          required
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
        )}

        <div className='relative mb-4'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='input-field pr-10'
            required
          />
          <ShowPasswordToggle
            showPassword={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
        )}

        <div className='relative mb-6'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            className='input-field pr-10'
            required
          />
          <ShowPasswordToggle
            showPassword={showConfirmPassword}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        {errors.confirmPassword && (
          <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>
        )}

        <ButtonPrimary type='submit'>SIGN UP</ButtonPrimary>
      </form>
    </div>
  )
}

export default RegisterForm
