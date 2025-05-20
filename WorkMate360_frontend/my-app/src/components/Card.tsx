import React, { useEffect, useState } from "react";
import axios from "axios";
import profileimage from "../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import { Search } from "./Search";

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
  profilePicture:string;
}

export function Card() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const response = await axios.get(API_URL);
        setProfiles(response.data);
        setFilteredProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Failed to load profiles. Please check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfiles();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredProfiles(profiles);
      return;
    }

    const searchIndex = parseInt(term);
    if (!isNaN(searchIndex)) {
      const foundProfile = profiles.find(
        (profile) => profile.index === searchIndex
      );
      setFilteredProfiles(foundProfile ? [foundProfile] : []);
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading profiles...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        {error}
        <p className="mt-2 text-sm">
          Ensure the backend is running at {API_URL}
        </p>
      </div>
    );
  }

  return (
    <div className="fixed left-50 right-50 h-[100vh] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col ">
      {/* <h1 className="text-black text-center pt-10 font-bold text-xl">
        List of Profiles
      </h1> */}

      {/* Search Component */}
      <div className="flex justify-end px-5 pt-2 pb-2">
        <Search onSearch={handleSearch} />
      </div>

      {/* Scrollable content area */}
      <div className="p-5 pb-50 space-y-4 overflow-y-auto flex-1 pb-24 grid grid-cols-3 gap-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div
              key={profile.index}
              className="flex flex-col  items-center bg-[#99AAAB] p-4 rounded-lg hover:bg-[#8a9a9b] transition-colors w-64 "
            >
              {/* Profile Image (Top) */}
              <img
  src={profile.profilePicture || profileimage}
  alt="profile_icon"
  className="w-20 h-20 object-cover rounded-full mb-3 border-2 border-white"
/>

              {/* Profile Info (Middle) */}
              <div className="text-center w-full">
                <p className="text-gray-900 font-medium text-lg">
                  {profile.name}
                </p>
                <p className="text-gray-700 text-sm font-bold">ID: {profile.index}</p>
                <p
                  className="text-gray-700 text-sm truncate"
                  title={profile.email}
                >
                  {profile.email}
                </p>
                <p className="text-gray-700 text-sm">{profile.phoneNumber}</p>
              </div>

              {/* Action Button (Bottom) */}
              <button
                className="mt-3 bg-slate-700 px-4 py-2 rounded-xl hover:bg-slate-600 text-white w-full left-50"
                onClick={() => navigate(`/details/${profile.index}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-10">
            {searchTerm
              ? `No profile found with index ${searchTerm}`
              : "No profiles available"}
          </div>
        )}
      </div>
    </div>
  );
}
