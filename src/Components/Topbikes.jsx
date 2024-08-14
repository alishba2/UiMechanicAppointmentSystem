import React, { useState } from 'react';
import './Topbikes.css';
import b1 from "../images/acc1.jpg";
import b2 from "../images/acc2.jpg";
import b3 from "../images/acc3.jpg";
import b4 from "../images/bp4.jpg";
import b5 from "../images/bp5.jpg";
import b6 from "../images/bp6.jpg";
import b7 from "../images/bp9.jpg";
import b8 from "../images/bp8.jpg";
import b9 from "../images/bp8.jpg";

function Topbikes({ title }) {
  const [currentCard, setCurrentCard] = useState(0);
  const totalCards = 10;
  const cardsPerPage = 3;

  const images = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
  const names = [
    "Check engine ",
    "Tyres Repair",
    "Color parts",
    "Brake repair",
    "Electrical repair",
    "Air system",
    "yalla habibi yalla",
    "yalla habibi yalla",
    "yalla habibi yalla",
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
  <br></br>

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          <h2> Services lists</h2>
          <div className="inner-card-row">
            {Array.from({ length: cardsPerPage }).map((_, index) => {
              const cardIndex = currentCard + index;
              return (
                <div key={index} className={`inner-card ${index === 0 ? 'active' : ''}`} onClick={() => handleClick(cardIndex)}>
                  <div className="inner-card-image">
                    <img src={images[cardIndex % images.length]} alt={`Featured Bike ${cardIndex + 1}`} />
                  </div>
                  <div className="inner-card-text">
                    <br></br>
                    <div className="mechanic-name">{names[cardIndex % names.length]}</div>
                    <div className="star-rating">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                    <div className="price">PKR 2000</div>
                  </div>
                  <button className="view-add-button semi-round" onClick={() => handleViewAdd(cardIndex)}>View Add</button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-arrows">
          <button className="left-arrow" onClick={handlePrevCard}>
            &lt;
          </button>
          <button className="right-arrow" onClick={handleNextCard}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbikes;
