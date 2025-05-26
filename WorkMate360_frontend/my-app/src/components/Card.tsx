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
    return <div className="text-center p-10">Loading profiles...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        {error}
        <p className="mt-2 text-sm">Ensure the backend is running at {`http://localhost:8080/profile/all`}</p>
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
