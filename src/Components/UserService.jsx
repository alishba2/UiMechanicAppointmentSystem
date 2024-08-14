import React from 'react';
import './UserService.css'; 
import avatar from './assets/avatar.jpeg';

const UserService = () => {
    return (
        <div className="user-service-container">
            <div className="user-profile-container">
                <img src={avatar} alt='Profile' className="user-profile-image" />
                <h3>User</h3>
            </div>
            <div className="user-textbox-container">
                <div className="user-input-button-row">
                    <input className="user-service-input" type="text" placeholder="View appointment" readOnly />
                    <button className="user-service-button">View</button>
                </div>
                <div className="user-input-button-row">
                    <input className="user-service-input" type="text" placeholder="schedule appointment" readOnly />
                    <button className="user-service-button">Schedule</button>
                </div>
                <div className="user-input-button-row">
                    <input className="user-service-input" type="text" placeholder="Book appointment" readOnly />
                    <button className="user-service-button">Booking</button>
                </div>

                <div className="user-input-button-row">
                    <input className="user-service-input" type="text" placeholder="Confirm appointment" readOnly />
                    <button className="user-service-button">Confirm</button>
                </div>
                <div className="user-input-button-row">
                    <input className="user-service-input" type="text" placeholder="reschedule appointment" readOnly />
                    <button className="user-service-button">reschedule</button>
                </div>
                <div className="user-input-button-row">
                    <input className="user-service-input" type="text" placeholder="Cancel appointment" readOnly />
                    <button className="user-service-button">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UserService;
