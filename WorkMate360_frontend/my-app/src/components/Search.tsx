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
    <div className='flex items-center'>
      <input 
        type="text" 
        className='outline-black w-100 h-10 rounded-l-xl text-right bg-slate-300 p-2' 
        placeholder='Search by index...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button 
        className='w-10 h-10 bg-slate-600 rounded-r-xl hover:bg-slate-500 flex items-center justify-center'
        onClick={handleSearch}
      >
        <img 
          src={searchimage} 
          alt="search_image" 
          className="w-6 h-6"  // Adjusted size for better proportion
        />
      </button>
    </div>
  );
}