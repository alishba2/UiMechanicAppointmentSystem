import React, { useState } from 'react';
import './Appointment.css';

const Appointment1 = () => {
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  const handleMechanicSelect = (mechanic) => {
    setSelectedMechanic(mechanic);
  };

  return (
    <div className="appointment-page">
      <div className="sidebar">
        <h3>Appointments </h3>
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;details </h3>
        <br></br>
        <br></br>
        <br></br>
        <ul>
          <li><a href="Appointment1">Appointment 1</a></li>
          <br></br>
          
        </ul>
        <ul><li><a href="Appointment2">Appointment 2</a></li></ul>
        <ul><li><a href="Appointment3">Appointment 3</a></li></ul>
      </div>
      <div className="appointment-container">
        <br></br>
        <br></br>
        <br></br>
        <br>
        </br>
        <h5> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Here you can see the booked appointment of customers that<br>
        </br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;booked mechanics according to their own choices</h5>
        <div className="mechanic-cards">
          </div>
    </div>
    </div>
  );
};

export default Appointment1;
