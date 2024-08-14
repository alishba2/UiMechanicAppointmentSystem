import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import avatar from './assets/avatar.jpeg';
import Profile from './Profile';
import axios from 'axios';
import { AuthContext } from './Context/appContext';
import { Navigate } from 'react-router-dom';



// import { useHistory } from 'react-router-dom';

function Booking() {
  const location = useLocation();
  const { mechanic } = location.state || {}; // Access the passed state (mechanic)

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user, "user");

  }, [user])

  useEffect(() => {
    console.log(mechanic, "mechanic")

  }, [mechanic])

  const [mechanicName, setMechanicName] = useState(mechanic?.username || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (mechanic) {
      setMechanicName(mechanic.username);

      // Split the availableTimeSlots string into an array
      const slots = mechanic.availableTimeSlots ? mechanic.availableTimeSlots.split(',') : [];
      setAvailableTimeSlots(slots);

      // Split the first element of the skills array into individual skills
      const mechanicSkills = mechanic.skills.length > 0 ? mechanic.skills[0].split(',') : [];
      setSkills(mechanicSkills);
    }
  }, [mechanic]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/appointments', {
        userId: user?._id, // Replace this with the actual user ID
        mechanicId: mechanic?._id,
        date,
        timeSlot: time,
        service: selectedSkill,
        status: 'pending', // You can also allow the user to set this if needed
      });

      if (response) {
        alert('Appointment created successfully');
        // navigate('/');
        // history.push('/Appointment'); // Redirect to the appointments page after successful submission
      }
    } catch (error) {
      console.error('There was an error creating the appointment!', error);
      alert('Failed to create appointment');
    }
  };

  return (
    <div className='container mx-auto mt-10 mb-5 border border-black border-2 border-opacity-25' style={{ width: '400px', boxShadow: '0 0 20px green, 0 0 5px black inset' }}>
      {/* <Profile mechanic={mechanic} /> */}
      <div className='title flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-black-500'>
          Book a Mechanic
        </h1>
        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
          Select a mechanic and book an appointment
        </span>
      </div>
      <form className="py-1" onSubmit={handleSubmit}>
        <div className="text-box flex flex-col items-center gap-6 justify-items-center">
          <input
            value={mechanicName}
            className='textbox'
            type="text"
            placeholder="Mechanic Name"
            style={{ borderRadius: '9px', marginLeft: '20%', marginTop: '5%', marginBottom: '5%', backgroundColor: 'lightgreen', width: '200px', textAlign: 'center' }}
            readOnly
          />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className='textbox'
            style={{ marginLeft: '20%', marginTop: '5%', backgroundColor: 'lightgreen', borderRadius: '9px', width: '65%', textAlign: 'center' }}
          >
            <option value="">Select Available Slot</option>
            {availableTimeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='textbox'
            type="date"
            placeholder="Date"
            style={{ borderRadius: '9px', marginLeft: '20%', marginTop: '3%', backgroundColor: 'lightgreen', width: '200px', textAlign: 'center' }}
          />
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            style={{ marginLeft: '20%', marginTop: '5%', backgroundColor: 'lightgreen', borderRadius: '9px', width: '65%' }}
          >
            <option value="">Select Skill</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>{skill}</option>
            ))}
          </select>
          <div style={{ display: 'flex', marginLeft: '5%', justifyContent: 'center' }}>
            <button className='btn text-black px-2 py-2 rounded border-black' type="submit" style={{ marginBottom: '15px', width: '100px', backgroundColor: 'white' }}>Submit</button>
          </div>
        </div>
        <div style={{ display: 'flex', width: '90%', marginLeft: '5%', justifyContent: 'center' }}>
          <Link to="/Appointment">
            <button className='btn text-black px-2 py-2 rounded border-black' type="button" style={{ marginBottom: '15px', width: '150px', backgroundColor: 'green' }}>See Appointments</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Booking;
