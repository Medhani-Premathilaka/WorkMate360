import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileimage from '../assets/images/profile.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

export function Card() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const response = await axios.get(API_URL);
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Failed to load profiles. Please check console for details.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllProfiles();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading profiles...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        {error}
        <p className="mt-2 text-sm">Ensure the backend is running at {API_URL}</p>
      </div>
    );
  }

  return (
    <div className="fixed left-50 right-100 h-[100vh] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <h1 className="text-black text-center pt-10 font-bold text-xl">List of Profiles</h1>
      
      {/* Scrollable content area with bottom padding */}
      <div className="p-5 space-y-4 overflow-y-auto flex-1 pb-24"> {/* Added pb-24 for bottom space */}
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div key={profile.index} className="flex items-center bg-[#99AAAB] p-4 rounded-lg">
              <img src={profileimage} alt="profile_icon" className='w-20 h-20 object-cover mr-4' />
              <div className="flex-2 ">
                <p className="text-gray-900 font-medium">{profile.index}. {profile.name}</p>
                <p className="text-gray-700 text-sm">Email: {profile.email}</p>
                <p className="text-gray-700 text-sm">Phone: {profile.phoneNumber}</p>
              </div>
              <button 
                className="bg-slate-700 p-2 rounded-xl hover:bg-slate-600 text-white"
                onClick={() => navigate(`/details/${profile.index}`)}
              >
                View
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No profiles found. The API returned an empty array.
            <p className="mt-2 text-sm">Check if your database has records.</p>
          </div>
        )}
      </div>

      
    </div>
  );
}