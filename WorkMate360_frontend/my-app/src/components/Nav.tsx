import React, { useState } from 'react';
import './Nav.css';
import menuimage from '../assets/images/menu.png';
import profileimage from '../assets/images/profile.png'
import { Sidebar } from './Sidebar'; // Uncommented and assuming you have this component

export function Nav() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className='bg-slate-700 w-full h-32 relative'>
      {/* Main Navigation */}
      <span className='text-white pl-10 font-serif text-2xl'>WorkMate</span>
      <span className='font-serif text-white text-5xl'>360</span>
      {/* <button style={{backgroundImage:`url(${profileimage})`}} className='fixed top-0 right-10 w-auto bg-black'> </button> */}
      
      <div className='flex items-center fixed right-10 top-0'>
  <span className='text-white font-serif mr-4'>Welcome back, Admin!</span>
  <button 
    className="w-20 h-20 bg-contain bg-no-repeat bg-center"
    style={{ backgroundImage: `url(${profileimage})` }}
    aria-label="Profile"
  ></button>
</div>
      {/* Menu Button */}
      <div className='pl-10 pt-2'>
        <button 
          onClick={toggleSidebar} 
          className="w-7 h-8 bg-contain bg-no-repeat bg-center focus:outline-none"
          style={{ backgroundImage: `url(${menuimage})` }}
          aria-label="Toggle menu"
        ></button>
      </div>

      {/* Conditionally render Sidebar */}
      {showSidebar && <Sidebar />}
    </div>
  );
}