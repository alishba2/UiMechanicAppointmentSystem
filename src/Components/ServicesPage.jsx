import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import avatar from './assets/service.jpg';
import './ServicesPage.css';

const ServicesPage = () => {
  return (
    <div className='service-page'>
       
      <div className="image-container">
        <img src={avatar} alt='service' className='service-image' />
        <div className="image-text">
          <h1>OUR SERVICES</h1>
          
          <br></br>
          <br></br>
          <h6> 
            Our company offers a comprehensive mechanical appointment
            <br></br> system designed to streamline and enhance the 
            <br></br>automotive service experience. Users can easily
            <br></br> schedule appointments with certified mechanics,
            <br></br> ensuring prompt and efficient service.
            <br></br> We prioritize customer convenience and satisfaction,
            <br></br> providing a user-friendly interface that allows for
            <br></br> seamless booking and management of appointments.
          </h6>
        </div>
      </div>
      
      <div className="service-card">
        <div className="service">
          <h2 className="service-title">Select Our Services</h2>
          <div className="button-container">
          <Link to="/MechanicService">
           <button className="circle-button">Mechanic</button>
           </Link>
            <div className="button-gap"></div>
            <Link to="/UserService">
            <button className="circle-button"> &nbsp;&nbsp;&nbsp;User&nbsp;&nbsp;&nbsp;</button>
            </Link>
          </div>
          <div className="black-divs-container">
            <div className="black-div">
              <p className="black-div-text">
                <h5>Repair and Diagnostics:</h5>
                Expert diagnostics to quickly identify and resolve any issues with your vehicle. Skilled mechanics ready to tackle any repair, big or small. Transparent pricing and detailed explanations of the work needed.
              </p>
            </div>
            <div className="black-div">
              <p className="black-div-text">
                <h5>Emergency Assistance:</h5>
                24/7 emergency service to get you back on the road safely. Quick response times and reliable repairs to minimize downtime. Peace of mind knowing help is just a call away in case of emergencies.
              </p>
            </div>
            <div className="black-div">
              <p className="black-div-text">
                <h5>Scheduled Maintenance:</h5>
                Ensure your vehicle is in top condition with our scheduled maintenance service. Regular check-ups and tune-ups to prevent costly repairs down the road. Keep track of your maintenance schedule with our convenient appointment system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
