import React, { useState, useEffect } from "react";
import "./Topmechanic.css"; // Update the import to match your CSS file
import dp from "../Components/assets/dp.png"; // Default image for mechanics without a profile image
import { useNavigate } from "react-router-dom";

function Topmechanic({ title }) {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState(0);
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsPerPage = 1;

  useEffect(() => {
    fetch("http://localhost:3001/mechanics")
      .then((response) => response.json())
      .then((data) => {
        const parsedMechanics = data.mechanics.map((mechanic) => ({
          ...mechanic,
        }));
        setMechanics(parsedMechanics);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching mechanics:", error);
        setError("Failed to fetch mechanics. Please try again later.");
        setLoading(false);
      });
  }, []);

  const totalCards = mechanics.length;

  const handlePrevCard = () => {
    setCurrentCard((prevCard) =>
      prevCard === 0 ? totalCards - cardsPerPage : prevCard - 1
    );
  };
  const handleSetAppointment = (mechanic) => {
    navigate("/booking", { state: { mechanic } });
  };

  const handleNextCard = () => {
    setCurrentCard((prevCard) =>
      prevCard === totalCards - cardsPerPage ? 0 : prevCard + 1
    );
  };

  const handleClick = (index) => {
    console.log(`Clicked on card ${index}`);
    // Add your navigation logic here
  };

  const handleViewAdd = (mechanic) => {
    console.log(`View Add clicked for ${mechanic.username}`);
    // Add your logic to handle viewing the ad
  };

  if (loading) {
    return <div>Loading mechanics...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="topmechanic-container">
      <div className="topmechanic-card">
        <div className="topmechanic-card-content">
          <h2>Top Mechanics</h2>
          <div className="topmechanic-inner-card-row">
            {Array.from({ length: cardsPerPage }).map((_, index) => {
              const cardIndex = (currentCard + index) % totalCards;
              const mechanic = mechanics[cardIndex];
              return (
                <div
                  key={index}
                  className={`topmechanic-inner-card ${
                    index === 0 ? "active" : ""
                  }`}
                  onClick={() => handleClick(cardIndex)}
                >
                  <div className="topmechanic-inner-card-image">
                    <img
                      src={mechanic.profileImage || dp}
                      alt={`Mechanic ${mechanic.username}`}
                    />
                  </div>
                  <div className="topmechanic-inner-card-text">
                    <div className="mechanic-name">{mechanic.username}</div>
                    <div className="star-rating">
                      &#9733;&#9733;&#9733;&#9733;&#9734;
                    </div>
                    <div className="price">
                      Starting from ${mechanic.hourlyRating}
                    </div>
                  </div>
                  <button
                    className="topmechanic-view-add-button semi-round"
                    onClick={() => handleSetAppointment(mechanic)}
                  >
                    Book Appointment
                  </button>
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
