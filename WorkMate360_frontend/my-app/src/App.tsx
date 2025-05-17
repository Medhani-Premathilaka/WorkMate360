import React from 'react'
import './App.css'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import { Details } from './pages/Details';
function App() {
  return (
  <Router>
    <div className='App'></div>
    <Routes>
      <Route path="/home" element={<Home/>}> </Route>
      <Route path="/" element={<Login/>}> </Route>
      <Route path="/details" element={<Details/>}> </Route>
    </Routes>
  </Router>
  )
}

export default App