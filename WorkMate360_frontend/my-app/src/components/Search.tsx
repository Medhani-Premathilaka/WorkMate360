import React, { useState } from 'react';
import searchimage from '../assets/images/search.png';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <input
        type="text"
        className="flex-grow h-12 px-4 text-gray-700 bg-white  focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-l-xl"
        placeholder="Search by Index or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="h-12 w-12 bg-sky-600 hover:bg-sky-700 flex items-center justify-center rounded-r-xl transition-colors duration-200"
        onClick={handleSearch}
        aria-label="Search"
      >
        <img
          src={searchimage}
          alt="search"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
}