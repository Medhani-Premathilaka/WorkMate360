
import './App.css'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import { Details } from './pages/Details';
import { Newdetails } from './pages/Newdetails';
import { User } from './pages/User';
import UserCredintials from './pages/UserCredintials';
import Calendar from 'react-calendar';
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
       <Route path="/user" element={<User/>}> </Route>
       <Route path="/form" element={<UserCredintials/>}></Route>
       <Route path="/calender" element={<Calendar/>}></Route>
    </Routes>
  </Router>
  )
}

export default App