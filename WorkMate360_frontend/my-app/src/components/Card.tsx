import React, { useEffect, useState } from "react";
import axios from "axios";
import profileimage from "../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { matchSorter } from 'match-sorter';



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
  imageUrl: string;
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
      // Get token if you need authentication
      const token = localStorage.getItem("token");
      
      // Configure request with token if available
      const config: any = {};
      if (token) {
        config.headers = {
          'Authorization': `Bearer ${token}`
        };
      }

      const response = await axios.get(`http://localhost:8080/profile/all`, config);
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

  const fetchProfileByName = async (name: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/profile/name`, {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching profile by name:", error);
      return [];
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredProfiles(profiles);
      return;
    }

    const searchIndex = parseInt(term);
    if (!isNaN(searchIndex)) {
      const foundProfile = profiles.find((profile) => profile.index === searchIndex);
      setFilteredProfiles(foundProfile ? [foundProfile] : []);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();
    const foundProfiles = profiles.filter((profile) =>
      profile.name && profile.name.toLowerCase().includes(lowerCaseTerm)
    );

    if (foundProfiles.length === 0) {
      const apiResults = await fetchProfileByName(term);
      setFilteredProfiles(apiResults || []);
    } else {
      setFilteredProfiles(foundProfiles);
    }
  };

  if (loading) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-2xl bg-white p-10">
    <div className="flex flex-col items-center justify-center text-gray-700">
      <svg 
        className="animate-spin h-8 w-8 mb-4 text-slate-700" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      <span className="text-lg font-semibold">
        Loading profiles, please wait...
      </span>
    </div>
  </div>
</div>
    
  );
}

if (error) {
  return (
    <div className="fixed top-70 left-90 shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-2xl">
      <div className="flex flex-col items-center justify-center p-10 text-red-600">
      <svg className="h-8 w-8 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
      <span className="text-lg font-semibold mb-2">Failed to load profiles</span>
      <span className="text-base">{error}</span>
      <p className="mt-2 text-sm text-gray-500">
        Please ensure your backend server is running and accessible at <span className="font-mono">http://localhost:8080/profile/all</span>.<br />
        If the issue persists, check your network connection or contact support.
      </p>
    </div>
    </div>
    
  );
}

  return (
    <div className="  w-full pb-50 min-h-screen bg-white rounded-xl shadow-lg h-64 overflow-auto flex flex-col">
      {/* Search Input */}
      <div className="fixed top-30 right-10">
        <Autocomplete
  freeSolo
  options={profiles.map((profile) => profile.name).filter(Boolean)} // remove nulls
  getOptionLabel={(option) => option || ""} // ensure fallback
  inputValue={searchTerm}
  filterOptions={(options, { inputValue }) =>
    matchSorter(options, inputValue)
  }
  onInputChange={(event, newValue) => {
    if (typeof newValue === "string") handleSearch(newValue);
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search profiles"
      variant="outlined"
      size="small"
    />
  )}
  className="w-full md:w-64"
/>
      </div>

      {/* Profile Cards */}
      <div className="w-full  md:p-5 overflow-y-auto flex-1 pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div
              key={profile.index}
              className="flex flex-col items-center bg-[#99AAAB] p-4 rounded-lg hover:bg-[#8a9a9b] transition-colors w-full h-70 mx-auto max-w-xs"
            >
              <img
                src={profile.imageUrl || profileimage}
                alt="profile"
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full mb-3 border-2 border-white"
              />
              <div className="text-center w-full">
                <p className="text-gray-900 font-medium text-base md:text-lg">
                  {profile.name}
                </p>
                <p className="text-gray-700 text-xs md:text-sm font-bold">
                  ID: {profile.index}
                </p>
                <p
                  className="text-gray-700 text-xs md:text-sm truncate"
                  title={profile.email}
                >
                  {profile.email}
                </p>
                <p className="text-gray-700 text-xs md:text-sm">
                  {profile.phoneNumber}
                </p>
              </div>
              <button
                className="mt-3  bg-slate-700 px-3 py-1 md:px-4 md:py-2 rounded-xl hover:bg-slate-600 text-white w-full text-sm md:text-base"
                onClick={() => navigate(`/details/${profile.index}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 p-10">
            {searchTerm
              ? `No profile found matching "${searchTerm}"`
              : "No profiles available"}
          </div>
        )}
      </div>
    </div>
  );
}
