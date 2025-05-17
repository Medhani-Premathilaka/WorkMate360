//import { useState } from 'react';
import { Dialog } from '@mui/material';
import logoutimage from '../assets/images/logout.png'
import AlertDialog from './Alert';
import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from './ui/button';


export function Sidebar() {
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="fixed top-32 left-0 w-50 h-[calc(100vh-8rem)] bg-slate-600 text-white p-4 z-50 font-serif">
      <ul>
        <li className="py-2 border-b border-slate-500">Dashboard</li>
        <li className="py-2 border-b border-slate-500">Profile</li>
        <li className="py-2 border-b border-slate-500">Settings</li>
      </ul>
      <button className="fixed bottom-5 left-5 flex items-center " onClick={handleClickOpen}>
        <img src={logoutimage} alt="logout_image" className="w-8 h-8" /><span className="ml-4">Logout</span>
      </button>
    
      <Dialog open={open} onClose={handleClose}
        aria-labelledby="Logout"
        aria-describedby="Logout-Description">

          <DialogTitle id="Logout" >
          <span className='font-serif text-slate-700 font-bold'>Logout</span>
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="Logout-Description">
            For your account’s security, please confirm you want to sign out.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} className='bg-slate-700 hover:bg-slate-300 hover:text-black'>Disagree</Button>
          <Button onClick={handleClose} className='bg-slate-700 hover:bg-slate-300 hover:text-black'>
            Agree
          </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
}