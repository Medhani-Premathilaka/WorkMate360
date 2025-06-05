import  { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import "react-calendar/dist/Calendar.css";

export function UserSidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [, setName] = useState("");

  const handleLogout = () => {
    // Clear all relevant data
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("index");
    localStorage.removeItem("name");
    localStorage.removeItem("profileImageUrl");
    localStorage.removeItem("username");
    // Optionally, clear all localStorage:
    // localStorage.clear();

    // Redirect to login page
    navigate("/");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);

    const storedRole = localStorage.getItem("role");
    if (storedRole === "ADMIN") {
      setRole("ADMIN");
    } else if (storedRole === "USER") {
      setRole("USER");
    }
  }, []);

  return (
    <div className="absolute top-20 left-0 w-50 h-[calc(100vh-0rem)] bg-[#e6e6e6] text-[#2f3e46] p-4 z-50 font- shadow-2xl flex flex-col gap-4">
      {role === "USER" && (
        <>
          <button className="absolute left-5 w-39 top-10 p-2 rounded-2xl hover:text-lg">
            <Link to={"/user"}>Home</Link>
          </button>
          <hr
            className="absolute left-5 w-39 top-10 border-t border-gray-400"
            style={{ marginTop: "3.5rem" }}
          />
          {/* <button className=" fixed left-5 w-39 top-48 p-2 rounded-2xl hover:text-xl">
            <Link to={"/calender"}>Calender</Link>
          </button> */}
          <hr
            className="absolute left-5 w-39 top-48 border-t border-gray-400"
            style={{ marginTop: "3.5rem" }}
          />
          <button className=" absolute left-5 w-39 top-30 p-2 rounded-2xl hover:text-lg">
            <Link to={"/form"}>Privacy</Link>
          </button>
          <hr
            className="absolute left-5 w-39 top-30 border-t border-gray-400"
            style={{ marginTop: "3.5rem" }}
          />
          <a
            href="mailto:sendtoworkmate360@gmail.com?subject=Requesting%20Leave&body=I%20would%20like%20to%20request%20leave%20on%20..."
            className="absolute left-5 w-39 top-48 p-2 rounded-2xl   flex items-center justify-center hover:text-xl"
          >
            Leave Request
          </a>
          <button
            className="absolute bottom-25 flex items-center"
            onClick={() => setOpen(true)}
          >
            <span className="bg-[#2f3e46] text-white px-4 py-2 rounded-xl flex items-center w-39 justify-center gap-2 hover:bg-[#c0c5c8] hover:text-black ">
              <LogOut className="text-white hover:text-black" />
              Logout
            </span>
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
            onClick={() => {
              handleLogout();
              handleClose();
            }}
            className="bg-slate-700 hover:bg-slate-300 hover:text-black"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}