import React, { useState } from 'react';
import './CardComponent.css';
import b1 from "../images/b1.jpg";
import b2 from "../images/b2.jpg";
import b3 from "../images/b3.jpg";
import b4 from "../images/b4.jpg";
import b5 from "../images/b5.jpg";
import b6 from "../images/b6.jpg";
import b7 from "../images/b9.jpg";
import b8 from "../images/b8.jpg";
import b9  from "../images/b10.jpg";

function CardComponent({ title }) {
  const [currentCard, setCurrentCard] = useState(0);
  const totalCards = 10;
  const cardsPerPage = 4;

  const images = [b1, b2, b3, b4,b5,b6,b7,b8,b9];
  const names = ["LIPIERRE", "ULTIMATE", "CRAZEBIKES", "GIANT", "COVELO", "UNIQUE", "UNITED", "CROWN", "METRO MOTOBIKES"];

  const handlePrevCard = () => {
    setCurrentCard((prevCard) => (prevCard === 0 ? totalCards - cardsPerPage : prevCard - 1));
  };

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard === totalCards - cardsPerPage ? 0 : prevCard + 1));
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          <h2>Popular Bikes Brands</h2>
         
          <div className="inner-card-row">
            {Array.from({ length: cardsPerPage }).map((_, index) => {
              const cardIndex = currentCard + index;
              return (
                <div key={index} className={`inner-card ${index === 0 ? 'active' : ''}`}>
  <div className="inner-card-image">
    <img src={images[cardIndex % images.length]} alt={`Featured Bike ${cardIndex + 1}`} />
  </div>
  <div className="inner-card-text">
    <h6 className="uppercase-text">{names[cardIndex % names.length]}</h6>
  </div>
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

export default CardComponent;
