import React from 'react'
import './App.css'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import { Details } from './pages/Details';
import { Newdetails } from './pages/Newdetails';
function App() {
  return (
  <Router>
    <div className='App'></div>
    <Routes>
      <Route path="/home" element={<Home/>}> </Route>
      <Route path="/" element={<Login/>}> </Route>
      <Route path="/new" element={<Newdetails/>}>
       </Route>
       <Route path="/details/:index" element={<Details />} />
    </Routes>
  </Router>
  )
}

export default App