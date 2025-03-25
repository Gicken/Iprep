import React from 'react'
import { NavLink } from 'react-router-dom'
import { PrimaryButton } from '../shared/components/Buttons'
import imagePath from '../assets/images/artificial-intelligence-icon-png-14771.png'

const HomePage = () => {
  return (
    <div className='flex items-center justify-center bg-[#1A1C1B] w-full pt-10 pl-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex w-full'>
        {/* Left Side */}
        <div className='w-1/2 pr-8 pt-20'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-2'>
            Your AI-Powered Assistant
          </h1>
          <p className='text-lg md:text-xl text-gray-300 mb-8'>
            Practice and perfect your interview skills with FDM's AI-powered
            interview tool. Get personalized feedback and guidance to get ready
            for the client.
          </p>
          <NavLink to='/login'>
            <PrimaryButton>Get started</PrimaryButton>
          </NavLink>
        </div>

        {/* Right Side */}
        <div className='w-1/2'>
          <img src={imagePath} alt='AI Assistant' className='w-full' />
        </div>
      </div>
    </div>
  )
}

export default HomePage
