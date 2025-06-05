import "./Home.css";
import { Nav } from "@/components/Nav";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  // Define showSidebar as needed, here as an example it's set to true
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/login-error");
      }
    }, [navigate]);

  return (
    <div>
      <Nav showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div>
        <Card showSidebar={showSidebar} />
      </div>
      
      {/* <div className="fixed top-40 right-20">
        <Search />
      </div> */}
    </div>
  );
}
