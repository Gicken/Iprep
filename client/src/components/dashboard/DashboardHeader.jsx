import React from 'react'
import { NavLink } from 'react-router-dom'
import imagePath from '../../assets/images/profile.png'
import logoPath from '../../assets/images/FDM_Logo_White_RGB.png'

const DashboardHeader = ({ title }) => {
  const user = JSON.parse(sessionStorage.getItem('user')) || {}

  return (
    <header className='flex justify-between items-center mb-8'>
      <div className='flex items-center'>
        <NavLink to='/dashboard'>
          <img src={logoPath} alt='Logo' className='h-12 w-auto mr-4' />
        </NavLink>
      </div>
      <h1 className='text-2xl font-bold border-y border-gray-600 py-2 px-4 rounded-lg'>
        {title}
      </h1>
      <div className='flex items-center'>
      <NavLink to='/dashboard/profile'>
        <img
          src={imagePath}
          alt='User Avatar'
          className='w-10 h-10 rounded-full mr-2'
        />
        </NavLink>
        <span>
          {user.firstName || 'Guest'} {user.lastName || ''}
        </span>
        
      </div>
    </header>
  )
}

export default DashboardHeader
