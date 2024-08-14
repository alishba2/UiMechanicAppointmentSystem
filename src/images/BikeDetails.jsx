import React from 'react';
import { useParams } from 'react-router-dom';

import b1 from '../images/b1.jpg';
import b2 from '../images/b2.jpg';

function BikeDetails() {
  // Use useParams to get the id from the URL
  const { id } = useParams(1);
  const bikeId = parseInt(id, 10); // Convert id to integer

  // Example data for bike details
  const bikeDetails = {
    0: {
      name: 'Lipierre',
      description: 'Description for Lipierre bike...',
      image: b1, // Import and use the image
    },
    1: {
      name: 'Ultimate',
      description: 'Description for Ultimate bike...',
      image: b2, // Import and use the image
    },
    // Add details for other bikes as needed
  };

  // Check if bike with given id exists, otherwise show a message
  const bike = bikeDetails[bikeId];
  if (!bike) {
    return <div>Bike not found</div>;
  }

  return (
    <div>
      <h2>{bike.name}</h2>
      <img src={b1} alt={bike.name} />
      <p>{bike.description}</p>
    </div>
  );
}

export default BikeDetails;
