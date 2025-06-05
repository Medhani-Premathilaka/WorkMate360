import React, { useEffect, useState } from "react";
import "./Nav.css";
//import menuimage from "../assets/images/menu.png";
import profileimage from "../assets/images/profile.png";
import { Sidebar } from "./Sidebar"; // Uncommented and assuming you have this component
import {UserSidebar} from "./UserSidebar";
import { Logs } from "lucide-react";

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

interface NavProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Nav({ showSidebar, setShowSidebar }: NavProps) {
  //const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const [name, setName] = useState("");
  const [role,setRole] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [sidebar, setSidebar] = useState<React.ReactNode>(null);



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
  }, [role]);

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  return (
    <div className="bg-[#2f3e46]  w-full h-20 flex items-center">
      {/* Main Navigation */}
      <div className="flex items-center ">
        <div className="pl-10 ">
        <button
          onClick={toggleSidebar}
          className="w-7 h-8 bg-contain bg-no-repeat bg-center  focus:outline-none"
          
        ><Logs className="text-white"/></button>
      </div>
        <span className="text-white  font-serif pb-1 text-2xl">WorkMate</span>
      <span className="font-serif text-white text-4xl">360</span>
      {/* Menu Button */}
      
      </div>
      
      {/* <button style={{backgroundImage:`url(${profileimage})`}} className='fixed top-0 right-10 w-auto bg-black'> </button> */}

      <div className="flex items-center  absolute right-10 ">
        <span className="text-white  mr-4 ">
          Welcome back, {name ? name : "ADMIN"} {role}!
        </span >
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
    className="w-16 h-16  mt-2 object-cover rounded-full mb-3 border-2 border-white"
    onError={(e) => {
      (e.target as HTMLImageElement).src = profileimage;
    }}
  />
      </div>
      

      {/* Conditionally render Sidebar */}
      {showSidebar  && sidebar}
    </div>
  );
}
