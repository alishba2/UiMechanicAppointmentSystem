import React from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import ServicesPage from "./ServicesPage";
//import CardComponent from "./CardComponent";
//import CardComponent1 from "./CardComponent1";
import Topbikes from "./Topbikes";
import Topmechanic from "./Topmechanic";
//import Add from "./Add";
import AboutUs from "./AboutUs";
import Accessories from "./Accessories";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <br></br>
      <Topbikes/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Topmechanic/>
      <br></br>
      <br></br>
     <ServicesPage/>
      
      <AboutUs/>
      <Accessories />
      <br></br>
      <br></br>
      <br></br>
      
      <Footer />
    </div>
  );
}
