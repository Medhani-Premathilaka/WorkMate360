//import { useState } from 'react';
import { Dialog } from '@mui/material';
import logoutimage from '../assets/images/logout.png'
//import AlertDialog from './Alert';
import React, { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from './ui/button';
import axios from 'axios';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';


export function Sidebar() {
const [open, setOpen] = React.useState(false);
const [employeeCount, setEmployeeCount] = useState<number>(0);
const [role, setRole] = useState("");
const [name, setName] = useState("");

useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);

    const storedRole = localStorage.getItem("role");
    console.log(storedName)
    if (storedRole === "ADMIN") {
      setRole("ADMIN");
    } else if (storedRole === "USER") {
      setRole("USER");
    }
  }, []);

const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect (() => {
    const fetchEmployeeCount = async () => {
    try{
      const response = await axios.get(`http://localhost:8080/profile/count`);
      setEmployeeCount(response.data);

    }catch(error){
      console.log("Error",error);
    }
  };
  fetchEmployeeCount();
  },[]);



  return (
    <div className="fixed top-25 left-0 w-50 h-[calc(100vh-6rem)] bg-slate-600 text-white p-4 z-50 font-serif">
      {role === "ADMIN" && (
        <>
          <div className="fixed left-5 w-39 h-32 rounded-xl bg-slate-200 shadow-md flex flex-col items-center justify-center p-4 text-black font-serif">
            <span className="text-4xl mb-2">{employeeCount}</span>
            <span className="text-l text-gray-600">Total Employees</span>
          </div>
          <div className="fixed top-70 left-5">
            <button className="bg-slate-700 text-white font-serif px-4 py-2 rounded-xl flex items-center w-39 justify-center gap-2 hover:bg-slate-300 hover:text-black">
              <a href="/new" className="flex items-center gap-1">
                <span className="text-2xl font-medium">+</span>
                <span className="text-base font-medium">Create New</span>
              </a>
            </button>
          </div>
          <button className="fixed bottom-5 left-5 flex items-center " onClick={handleClickOpen}>
            <img src={logoutimage} alt="logout_image" className="w-8 h-8" /><span className="ml-4">Logout</span>
          </button>
        </>
      )}

      

      <Dialog open={open} onClose={handleClose}
        aria-labelledby="Logout"
        aria-describedby="Logout-Description" className='rounded-2xl'>
        <DialogTitle id="Logout" >
          <span className='font-serif text-slate-700 font-bold'>Logout</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="Logout-Description">
            For your account’s security, please confirm you want to Logout.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='bg-slate-700 hover:bg-slate-300 hover:text-black'>Disagree</Button>
          <Button onClick={handleClose} className='bg-slate-700 hover:bg-slate-300 hover:text-black'>
            <a href="/">Agree</a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}