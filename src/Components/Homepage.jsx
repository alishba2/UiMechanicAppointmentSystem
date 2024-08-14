import React, { useState, useEffect } from 'react';
import './Homepage.css'; // Create a CSS file for styling

import img3 from "../images/bike2.jpg";
import img4 from "../images/bike3.jpg";
import img5 from "../images/bike4.jpg";





function Homepage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % 3); // Cycle through images 0, 1, 2
    }, 3000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="form-container">
      <form className="my-form">
        <div className="image-container">
          <img src={currentImage === 0 ? img3 : (currentImage === 1 ? img4 : img5)} alt={`Image ${currentImage + 1}`} className="slider-image" />
        </div>
      </form>
      
     

    </div>
  );
}

export default Homepage;
