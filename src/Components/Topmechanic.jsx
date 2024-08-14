import React, { useState } from 'react';
import './Topmechanic.css'; // Update the import to match your CSS file
import b1 from "../images/acc1.jpg"; // Update the image imports
import b2 from "../images/acc2.jpg";
import b3 from "../images/acc3.jpg";
// Add more images if needed

function Topmechanic({ title }) {
  const [currentCard, setCurrentCard] = useState(0);
  const totalCards = 10;
  const cardsPerPage = 1;

  const images = [b1, b2, b3]; // Add more images to match your imports
  const names = [
    "Mechanic 1",
    "Mechanic 2",
    "Mechanic 3",
    // Add more names if needed
  ];

  const handlePrevCard = () => {
    setCurrentCard((prevCard) => (prevCard === 0 ? totalCards - cardsPerPage : prevCard - 1));
  };

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard === totalCards - cardsPerPage ? 0 : prevCard + 1));
  };

  const handleClick = (index) => {
    console.log(`Clicked on card ${index}`);
    // Add your navigation logic here
  };

  const handleViewAdd = (index) => {
    console.log(`View Add clicked for card ${index}`);
    // Add your logic to handle viewing the ad
  };

  return (
    <div className="topmechanic-container">
      <div className="topmechanic-card">
        <div className="topmechanic-card-content">
          <h2>Top Mechanics</h2>
          <div className="topmechanic-inner-card-row">
            {Array.from({ length: cardsPerPage }).map((_, index) => {
              const cardIndex = currentCard + index;
              return (
                <div key={index} className={`topmechanic-inner-card ${index === 0 ? 'active' : ''}`} onClick={() => handleClick(cardIndex)}>
                  <div className="topmechanic-inner-card-image">
                    <img src={images[cardIndex % images.length]} alt={`Mechanic ${cardIndex + 1}`} />
                  </div>
                  <div className="topmechanic-inner-card-text">
                    <div className="mechanic-name">{names[cardIndex % names.length]}</div>
                    <div className="star-rating">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                    <div className="price">Starting from PKR 2000</div>
                  </div>
                  <button className="topmechanic-view-add-button semi-round" onClick={() => handleViewAdd(cardIndex)}>View Profile</button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="topmechanic-card-arrows">
          <button className="topmechanic-left-arrow" onClick={handlePrevCard}>
            &lt;
          </button>
          <button className="topmechanic-right-arrow" onClick={handleNextCard}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topmechanic;
