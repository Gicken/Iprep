import React from 'react';
import '../../assets/styles/ComingSoon.css'


const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Coming Soon</h1>
        <p className="coming-soon-message">
          This page is currently under development. Stay tuned for updates!
        </p>
        <div className="loading-spinner">
          <div className="spinner-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;