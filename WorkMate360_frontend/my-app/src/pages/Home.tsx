import React from 'react'

import './Home.css'
import {Nav} from '@/components/Nav'
import {Card} from '@/components/Card'
import { Search } from '@/components/Search'

export function Home() {
  return (
    <div>
      <Nav/>
      <div className='absolute top-64 left-64'>
        
        <Card/>
      </div>
      <div className='fixed top-40 right-20'>
        <Search/>
      </div>
      <div className='fixed top-55 right-20'>
        <button className='bg-slate-600 text-white font-serif p-2 rounded-xl flex items-center'><a href="/details">Add New Employee</a> </button>
      </div>
    </div>
  )
}

