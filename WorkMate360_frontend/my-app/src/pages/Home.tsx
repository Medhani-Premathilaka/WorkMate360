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
    </div>
  )
}

