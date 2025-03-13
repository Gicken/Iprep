import React, { useState, useEffect } from 'react';
import imagePath from '../assets/images/profile.png'
import { useOutletContext } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const { setTitle } = useOutletContext();

  useEffect(() => {
      setTitle("My Profile");
  });


  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1A1C1B]-100">
      <div className="bg-[#555D58] p-6 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-4">
          <img
            src={imagePath}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
        </div>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Email"
        />
        <button
          onClick={handleUpdate}
          className="w-full bg-[#59FF00] text-black font-bold p-2 rounded"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
