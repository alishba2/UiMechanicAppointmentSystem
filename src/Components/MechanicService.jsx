import React from 'react';
import './MechanicService.css'; 
import avatar from './assets/avatar.jpeg';

const MechanicService = () => {
    return (
        <div className="mechanic-service-container">
            <div>
                <img src={avatar} alt='Profile' className="profile-image" />
                <h3>Mechanic</h3>
            </div>
            <div className="textbox-container">
                <div className="input-button-row">
                    <input className="service-input" type="text" placeholder="View appointment" />
                    <button className="service-button">View</button>
                </div>
                <div className="input-button-row">
                    <input className="service-input" type="text" placeholder="Confirm appointment" />
                    <button className="service-button">Confirm</button>
                </div>
                <div className="input-button-row">
                    <input className="service-input" type="text" placeholder="Cancel appointment" />
                    <button className="service-button">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default MechanicService;
