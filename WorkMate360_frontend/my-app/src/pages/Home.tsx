import "./Home.css";
import { Nav } from "@/components/Nav";
import { Card } from "@/components/Card";
import { useState } from "react";

export function Home() {
  // Define showSidebar as needed, here as an example it's set to true
  const [showSidebar, setShowSidebar] = useState(true);

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
