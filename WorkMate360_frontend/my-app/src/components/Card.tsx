import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response.data); // Debug log
        setProfiles(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Full error details:", {
            message: error.message,
            config: error.config,
            response: error.response?.data
          });
        } else {
          console.error("Unknown error:", error);
        }
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
    <div className="w-[50vw] h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden">
      <h1 className="text-black text-center pt-10 font-bold text-xl">List of Profiles</h1>
      <div className="p-5 space-y-4 overflow-y-auto h-[60vh]">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div key={profile.index} className="bg-[#99AAAB] p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-900 font-medium">{profile.index}. {profile.name }</p>
                  <p className="text-gray-700 text-sm">Email: {profile.email }</p>
                  <p className="text-gray-700 text-sm">Phone: {profile.phoneNumber }</p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm">
                    Location: {profile.province }, {profile.district }
                  </p>
                  <p className="text-gray-700 text-sm">
                    Address: {profile.street }, {profile.houseNumber }
                  </p>
                  <p className="text-gray-700 text-sm">
                    Gender: {profile.gender } | Age: {profile.ageNow }
                  </p>
                  <p className="text-gray-700 text-sm">
                    Address: {profile.dateOfBirth }
                  </p>
                </div>
              </div>
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