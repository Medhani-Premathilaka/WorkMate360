import { Nav } from '@/components/Nav'
import { Card } from '@mui/material'
import React from 'react'

export  function User() {
  return (
    <div>
      <Nav/>
      <div className='w-full pb-50 min-h-screen bg-white rounded-xl shadow-lg h-64 overflow-auto flex flex-col'>
          <button className='bg-slate-700 text-white absolute right-10 top-32 font-serif p-3 hover:text-xl rounded-xl'>+ New Todo</button>
          <div className="fixed top-45 left-64">
                  
                </div>
      </div>
      
    </div>
  )
}
