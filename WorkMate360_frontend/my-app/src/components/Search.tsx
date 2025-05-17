import './Nav.css'
import searchimage from '../assets/images/search.png'
import React from 'react'

export  function Search() {
  return (
    <div className='flex items-center'>
      

      <input type="text" className='outline-black w-100 h-10 rounded-l-xl text-right bg-slate-300 p-2' placeholder='.....  Search' />
      <button className='w-10 h-10 bg-slate-600 rounded-r-xl'>
        <img src={searchimage} alt="search_image" />
        
      </button>
    </div>
  )
}
