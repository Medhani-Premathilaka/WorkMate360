import { Nav } from '@/components/Nav'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useFilePicker } from 'use-file-picker';

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
  profilePicture : string;
}

export function Details() {
  const { index } = useParams<{ index: string }>();
  const [selectedValue, setSelectedValue] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const { openFilePicker, filesContent, clear } = useFilePicker({
    accept: '.png',
    readAs: 'DataURL',
    multiple: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile/details/${index}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profiles: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [index]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div>
      <Nav/>
      <div className='absolute left-50 right-50 top-50 h-auto bg-white rounded-xl shadow-xl overflow-hidden flex flex-col font-serif'>
        <form className='p-8'>
          <h2 className="text-center text-xl font-bold p-8">{profile.name}</h2>

          <div className="grid grid-cols-2 gap-8 px-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Index</label>
                <input readOnly
                  type="text" 
                  value={profile.index || ''}
                  className='w-full h-10 bg-slate-100 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, index: Number(e.target.value) })}
                />
              </div>
              
              <div>
                <label className="block mb-2">Phone Number</label>
                <input
                  type="text"
                  value={profile.phoneNumber || ''}
                  className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, phoneNumber: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block mb-2">District</label>
                <input 
                  type="text" 
                  value={profile.district || ''}
                  className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, district: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block mb-2">House Number</label>
                <input 
                  type="text" 
                  value={profile.houseNumber || ''}
                  className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, houseNumber: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block mb-2">Date Of Birth</label>
                <input 
                  type="date" 
                  value={profile.dateOfBirth || ''}
                  className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, dateOfBirth: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block mb-2">Age</label>
                <input 
                  type="text" 
                  value={profile.ageNow || ''}
                  className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, ageNow: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Email</label>
                <input 
                  type="text" 
                  value={profile.email || ''}
                  className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block mb-2">Province</label>
                <input 
                  type="text" 
                  value={profile.province || ''}
                  className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, province: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block mb-2">Street</label>
                <input 
                  type="text" 
                  value={profile.street || ''}
                  className='w-full h-10 bg-slate-300 rounded-lg p-2 focus:outline-black'
                  onChange={e => setProfile({ ...profile, street: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block mb-2">Gender</label>
                <select 
                  value={selectedValue}
                  onChange={e => {
                    setSelectedValue(e.target.value);
                    setProfile({ ...profile, gender: e.target.value });
                  }}
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
          <div className='m-4 p-8 w-full h-auto align-middle flex justify-end'>
            <button className='bg-red-600 hover:bg-slate-400 hover:text-black text-white p-2 w-20 rounded-lg mr-4'>Delete</button>
            <button className='bg-blue-600 hover:bg-slate-400 hover:text-black text-white p-2 w-20 rounded-lg mr-4'>Reset</button>
            <button className='bg-yellow-600 hover:bg-slate-400 hover:text-black text-white p-2 w-20 rounded-lg mr-4'>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}