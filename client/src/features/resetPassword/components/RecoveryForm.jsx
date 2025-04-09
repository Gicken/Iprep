import React, { useState } from 'react';

const RecoveryForm = ({ onSubmit, error, message, isLoading }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#1A1C1B]'>
      <div className='max-w-md w-full bg-[#2A2C2B] p-6 rounded-lg shadow-md border-2 border-green-500'>
        <h2 className='text-xl font-bold text-white text-center'>
          Recover Password
        </h2>
        <p className='text-gray-400 text-center mb-4'>
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full border border-gray-500 bg-transparent text-white p-2 rounded mb-4'
            required
          />

          <button
            type='submit'
            disabled={isLoading}
            className={`w-full bg-[#59FF00] text-black px-4 py-2 rounded mt-4 hover:bg-green-600 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Processing...' : 'Recover'}
          </button>
        </form>

        {message && (
          <p className='mt-4 text-green-500 text-center'>{message}</p>
        )}
        {error && <p className='mt-4 text-red-500 text-center'>{error}</p>}
      </div>
    </div>
  );
};

export default RecoveryForm;