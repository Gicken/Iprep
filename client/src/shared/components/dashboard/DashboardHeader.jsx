import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardHeader = ({ title }) => {

  return (
    <header className='flex justify-between items-center mb-8'>
      <div className='flex items-center'>
      </div>
      <h1 className='text-2xl font-bold border-y border-gray-600 py-2 px-4 rounded-lg'>
        {title}
      </h1>
      <div className='flex items-center'>
      </div>
    </header>
  )
}

export default DashboardHeader
