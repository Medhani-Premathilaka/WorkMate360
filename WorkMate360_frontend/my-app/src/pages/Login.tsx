import React from 'react'
import './Login.css'


export function Login() {
  return (
    <div className="bg-[url(../assets/images/login.jpg)] min-h-screen w-full">
      <div className="fixed bottom-1/2 left-1/2 transform translate-y-1/2 -translate-x-1/2 w-80 h-auto p-8 border-2 border-white/50 bg-white outline outline-white rounded-2xl  items-center justify-center shadow-2xl  font-serif">
        <h3 className='text-center text-xl font-bold text-slate-700'>Welcome</h3>
        <br />
        <label htmlFor="Username" className='text-slate-600'>Username</label>
        <br />
        <input type="text"  placeholder='Enter username' className='border-slate-300 p-1 border-2 rounded-sm shadow-xl text-xs w-full p-2'/>
        
        <br />
        <br />
        <label htmlFor="Password" className='text-slate-600'>Password</label>
        <br />
        <input type="password"  placeholder='Enter password' className='border-slate-300 p-1 border-2 rounded-sm shadow-xl text-xs w-full p-2 '/>
        
        <br />
        <br />

        <button className=' justify-center bg-slate-700 rounded-2xl w-full p-1 text-white hover:bg-slate-400 hover:text-slate-700 hover:shadow-xl'>Login</button>

        <br />
        <div className='py-2'></div>
        <button className=' justify-center bg-slate-700 hover:bg-slate-400 rounded-2xl w-full p-1 text-white hover:text-slate-700 hover:shadow-xl'>Reset</button>
      </div>
    </div>
  )
}