

import "./Home.css";
import { Nav } from "@/components/Nav";
import { Card } from "@/components/Card";


export function Home() {
  return (
    <div>
      <Nav />
      <div className="fixed top-45 left-64">
        <Card />
      </div>
      {/* <div className="fixed top-40 right-20">
        <Search />
      </div> */}
      
    </div>
  );
}
