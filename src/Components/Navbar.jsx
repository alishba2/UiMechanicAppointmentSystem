import React, { useState, useContext, useEffect } from 'react';
import './Navbar.css';
import img2 from "../images/bike.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './Context/appContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user, "user data");
    console.log(isLoggedIn, "is logged in");
  }, [user, isLoggedIn]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const handleNavigate = () => {
    if (user?.role === "customer") {
      navigate("/customerDashboard"); // Corrected path here
    } else {
      navigate("/dashboard-user");
    }
  };

  const handleMechanicClick = () => {
    navigate("/mechanics");
  };

  return (
    <div className='container'>
      <div className="searchbox">
        <img src={img2} alt='Logo' className='logo' />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FaSearch />
        &nbsp;  &nbsp;
        <input type='text' placeholder='Search' />
        &nbsp;  &nbsp;  &nbsp;

        {isLoggedIn ? (
          <div className="user-menu">
            <p onClick={toggleDropdown} style={{ color: "black" }} className='username'>
              {user?.username} {/* Displaying user.username */}
            </p>
            {showDropdown && (
              <div className="dropdown">
                {/* Use handleNavigate to navigate based on user role */}
                <button onClick={handleNavigate}>
                  {user?.role} Dashboard
                </button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="button-container">
            <Link to="/login">
              <button className='semi-round-btn'>Login</button>
            </Link>
            &nbsp;  &nbsp;  &nbsp;  &nbsp;
            <Link to="/Register">
              <button className='semi-round-btn'>Signup</button>
            </Link>
          </div>
        )}
      </div>
      <button onClick={toggleMenu} className='toggle-icon'>
        <FontAwesomeIcon icon={faBars} />
        &nbsp;Menu
      </button>
      &nbsp;  &nbsp;
      {isOpen && (
        <ul className='bar'>
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
          {!isLoggedIn && <li><Link to="/Register">Signup</Link></li>}
          <li onClick={handleMechanicClick}>Mechanic</li>
          <li><Link to="/contactus">Contact Us</Link></li>
          <li><Link to="/booking">Booking</Link></li>
          <li><Link to="/ServicesPage">Services</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/video">Video</Link></li>
          <li><Link to="/accessories">Accessories</Link></li>
          <li><Link to="/faqs">FAQs</Link></li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
