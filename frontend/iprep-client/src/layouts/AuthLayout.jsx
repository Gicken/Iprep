import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark">
      <div className="login-form-container">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;