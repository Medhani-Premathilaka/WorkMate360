//import React, { useEffect, useState } from 'react'
import { Dialog } from "@mui/material";
import logoutimage from "../assets/images/logout.png";
//import AlertDialog from './Alert';
import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "./ui/button";
import axios from "axios";
import { Link } from "react-router";

import "react-calendar/dist/Calendar.css";

export function UserSidebar() {
  
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);

    const storedRole = localStorage.getItem("role");
    console.log(storedName);
    if (storedRole === "ADMIN") {
      setRole("ADMIN");
    } else if (storedRole === "USER") {
      setRole("USER");
    }
  }, []);

  return (
    <div className="fixed top-25 left-0 w-50 h-[calc(100vh-6rem)] bg-slate-600 text-white p-4 z-50 font-serif">
      {role === "USER" && (
        <>
          <button className=" fixed left-5 w-39 top-32 p-2 rounded-2xl hover:text-xl">
            <Link to={"/user"}>Home</Link>
          </button>
          
          <hr
            className="fixed left-5 w-39 top-32 border-t border-gray-400"
            style={{ marginTop: "3.5rem" }}
          />
          <button className=" fixed left-5 w-39 top-48 p-2 rounded-2xl hover:text-xl">
           <Link to={"/calender"}>Calender</Link>
          </button>

          <hr
            className="fixed left-5 w-39 top-48 border-t border-gray-400"
            style={{ marginTop: "3.5rem" }}
          />
          <button className=" fixed left-5 w-39 top-80 p-2 rounded-2xl hover:text-lg">
            <Link to={"/form"}>Privacy</Link>
          </button>
          <hr
            className="fixed left-5 w-39 top-64 border-t border-gray-400"
            style={{ marginTop: "3.5rem" }}
          />
          <a
            href="mailto:workmate360@gmail.com?subject=Requesting%20Leave&body=I%20would%20like%20to%20request%20leave%20on%20..."
            className="fixed left-5 w-39 top-64 p-2 rounded-2xl   flex items-center justify-center hover:text-xl"
          >
            Leave Request
          </a>

          <button
            className="fixed bottom-5 left-5 flex items-center "
            onClick={handleClickOpen}
          >
            <img src={logoutimage} alt="logout_image" className="w-8 h-8" />
            <span className="ml-4">Logout</span>
          </button>
          
        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Logout"
        aria-describedby="Logout-Description"
        className="rounded-2xl"
      >
        <DialogTitle id="Logout">
          <span className="font-serif text-slate-700 font-bold">Logout</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="Logout-Description">
            For your account’s security, please confirm you want to Logout.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="bg-slate-700 hover:bg-slate-300 hover:text-black"
          >
            Disagree
          </Button>
          <Button
            onClick={handleClose}
            className="bg-slate-700 hover:bg-slate-300 hover:text-black"
          >
            <a href="/">Agree</a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
