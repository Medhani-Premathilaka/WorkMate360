import { Nav } from '@/components/Nav'
import React, { useState, useEffect } from 'react'
import { useFilePicker } from 'use-file-picker';

const API_URL = "http://localhost:8080/profile/all";

interface Profile {
  index: number;
  name: string;
  email: string;
  phoneNumber: string;
  province: string;
  district: string;
  street: string;
  houseNumber: string;
  gender: string;
  ageNow: number;
  dateOfBirth?: string;
}

export function Details() {
  const [selectedValue, setSelectedValue] = useState('');
  const { openFilePicker, filesContent, loading, clear } = useFilePicker({
    accept: '.png',
    readAs: 'DataURL', // This ensures we get base64 encoded images
    multiple: false, // Only allow single file selection
  });

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      clear(); // Clear the file picker state
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav/>
      <div className='absolute left-50 right-50 top-50 h-auto bg-white rounded-xl shadow-xl overflow-hidden flex flex-col font-serif'>
        <form className='p-8'>
          <h2 className="text-center text-xl font-bold p-8">Name</h2>

          <div className="grid grid-cols-2 gap-8 px-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Index</label>
                <input type="text" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
              
              <div>
                <label className="block mb-2">Phone Number</label>
                <input type="text" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
              
              <div>
                <label className="block mb-2">District</label>
                <input type="text" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
              
              <div>
                <label className="block mb-2">House Number</label>
                <input type="text" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
              
              <div>
                <label className="block mb-2">Date Of Birth</label>
                <input type="date" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
              
              <div>
                <label className="block mb-2">Age</label>
                <input type="text" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Email</label>
                <input type="text" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
              
              <div>
                <label className="block mb-2">Province</label>
                <input type="text" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
              
              <div>
                <label className="block mb-2">Street</label>
                <input type="text" className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'/>
              </div>
              
              <div>
                <label className="block mb-2">Gender</label>
                <select 
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="w-full h-10 p-2 bg-slate-300 rounded-lg focus:outline-black"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
              <div>
                
                
                {filesContent.map((file, index) => (
                  <div key={index} className="mt-4 ">
                    <img 
                      src={file.content} 
                      alt="Uploaded profile"
                      className="w-40 h-40 object-contain border rounded-lg "
                    />
                    <p className="text-sm text-gray-500 mt-1">{file.name}</p>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => openFilePicker()} 
                  className='bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-300 hover:text-slate-700'
                >
                  Upload Profile Picture
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}