import { React, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";
import '../../../assets/styles/features/dashboard/ComingSoon.css'


const ComingSoon = () => {
    const { setTitle } = useOutletContext()

    useEffect(() => {
      setTitle('Coming Soon')
    })
  return (
    <div className="coming-soon-container">
      <div className="content">
        {/* <h1>Coming Soon</h1> */}
        <p>We're working hard to bring you something amazing.</p>
        <div className="animation-container">
          <div className="loader">
            <div className="loader-inner"></div>
          </div>
        </div>
        <p>Stay tuned!</p>
      </div>
    </div>
  );
};

export default ComingSoon;