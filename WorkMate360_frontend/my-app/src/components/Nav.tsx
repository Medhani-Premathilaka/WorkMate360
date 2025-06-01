import React, { useEffect, useState } from "react";
import "./Nav.css";
import menuimage from "../assets/images/menu.png";
import profileimage from "../assets/images/profile.png";
import { Sidebar } from "./Sidebar"; // Uncommented and assuming you have this component
import {UserSidebar} from "./UserSidebar";

// interface LoginResponse {
//   token: string;
//   role : string;// Add other fields if your backend returns more data
// }
// interface Profile {
//   index: number;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   province: string;
//   district: string;
//   street: string;
//   houseNumber: string;
//   gender: string;
//   ageNow: number;
//   dateOfBirth?: string;
//   imageUrl: string;
// }

export function Nav() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [name, setName] = useState("");
  const [role,setRole] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [sidebar, setSidebar] = useState<React.ReactNode>(null);

//   const selectSidebar = () => {
//   const storedRole = localStorage.getItem("role");
//   if (storedRole === "ADMIN") {
//     setSidebar(<Sidebar />);
//   } else if (storedRole === "USER") {
//     setSidebar(<UserSidebar />);
//   }
// };

// useEffect(() => {
//   const storedName = localStorage.getItem("name");
//   if (storedName) setName(storedName);
//   selectSidebar();
// }, []);

// const toggleSidebar = () => {
//   selectSidebar();
//   setShowSidebar(!showSidebar);
// };

useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);

    const storedImage = localStorage.getItem("profileImageUrl");
    setProfileImageUrl(storedImage);

    const storedRole = localStorage.getItem("role");
    setRole(storedRole || "");
    if ((storedRole || "") === "ADMIN") {
      setSidebar(<Sidebar />);
    } else if ((storedRole || "") === "USER") {
      setSidebar(<UserSidebar />);
    }
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="bg-[#40486f] fixed w-full h-25 ">
      {/* Main Navigation */}
      <span className="text-white pl-10 font-serif text-2xl">WorkMate</span>
      <span className="font-serif text-white text-5xl">360</span>
      {/* <button style={{backgroundImage:`url(${profileimage})`}} className='fixed top-0 right-10 w-auto bg-black'> </button> */}

      <div className="flex items-center fixed right-10 top-0">
        <span className="text-white font-serif mr-4">
          Welcome back, {name ? name : "ADMIN"} {role}!
        </span>
        {/* <button
          className="w-20 h-20 bg-contain bg-no-repeat bg-center rounded-full border-2 border-white"
          style={{
            backgroundImage: `url(${profileImageUrl || profileimage})`,
          }}
          aria-label="Profile"
        ></button> */}
        <img
    src={profileImageUrl || profileimage}
    alt="profile"
    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full mb-3 border-2 border-white"
    onError={(e) => {
      (e.target as HTMLImageElement).src = profileimage;
    }}
  />
      </div>
      {/* Menu Button */}
      <div className="pl-10 pt-2">
        <button
          onClick={toggleSidebar}
          className="w-7 h-8 bg-contain bg-no-repeat bg-center focus:outline-none"
          style={{ backgroundImage: `url(${menuimage})` }}
          aria-label="Toggle menu"
        ></button>
      </div>

      {/* Conditionally render Sidebar */}
      {showSidebar  && sidebar}
    </div>
  );
}
