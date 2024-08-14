import React, { useState } from 'react';
import './Appointment3.css';

const Appointment3 = () => {
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
          <li><a href="Appointment">Appointment</a></li>
          <br></br>
          
        </ul>
        
        <ul>
          <li><a href="Appointment1">Appointment 1</a></li>
          <br></br>
          
        </ul>
        <ul><li><a href="Appointment2">Appointment 2</a></li></ul>
        <ul><li><a href="Appointment3">Appointment 3</a></li></ul>
      </div>
      <div className="appointment-container-new">
        <h1 className="appointment-header-new">Appointment 3 details</h1>
        <div className="mechanic-cards-new">
          <div
            className={`mechanic-card-new ${selectedMechanic === 'Mechanic 1' ? 'selected' : ''}`}
            onClick={() => handleMechanicSelect('Mechanic 1')}
          >
            <p><h4>Mechanic name: Javad</h4></p>
            <p>Specialty: air conditioner and heat checking system</p>
            <p>Location:islmabad</p>
            <p>Availability: Fri</p> 
            <p>Time: 10am-5pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment3;
