import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import { AuthContext } from "./Context/appContext";
import "./Navbar.css";
import img2 from "../images/bike.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
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

  const handleLogoutClick = () => {
    setShowModal(true); // Show the modal when the logout button is clicked
    setShowDropdown(false); // Hide dropdown when modal is shown
  };

  const confirmLogout = () => {
    logout(); // Perform the actual logout
    setShowModal(false); // Close the modal after logout
    navigate("/"); // Navigate to the home page or login page
  };

  const handleNavigate = () => {
    if (user?.role === "customer") {
      navigate("/customerDashboard");
    } else {
      navigate("/dashboard-user");
    }
  };

  const handleMechanicClick = () => {
    navigate("/mechanics");
  };

  return (
    <>
      <div className="container">
        <div className="searchbox">
          <img src={img2} alt="Logo" className="logo mx-4" />
          {/*   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FaSearch />
          &nbsp; &nbsp;
          <input type="text" placeholder="Search" />
          &nbsp; &nbsp; &nbsp; */}
          {isLoggedIn ? (
            <div className="user-menu">
              <p
                onClick={toggleDropdown}
                style={{ color: "black" }}
                className="username"
              >
                {user?.username}
              </p>
              {showDropdown && (
                <div className="dropdown">
                  <button onClick={handleNavigate}>
                    {user?.role} Dashboard
                  </button>
                  <button onClick={handleLogoutClick}>Logout</button>{" "}
                  {/* Open modal on logout click */}
                </div>
              )}
            </div>
          ) : (
            <div className="button-container">
              <Link to="/login">
                <button className="semi-round-btn">Login</button>
              </Link>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <Link to="/Register">
                <button className="semi-round-btn">Signup</button>
              </Link>
            </div>
          )}
        </div>
        <button onClick={toggleMenu} className="toggle-icon">
          <FontAwesomeIcon icon={faBars} />
          &nbsp;Menu
        </button>
        &nbsp; &nbsp;
        {isOpen && (
          <ul className="bar">
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/Register">Signup</Link>
                </li>
              </>
            )}
            <li onClick={handleMechanicClick} style={{ cursor: "pointer" }}>
              Mechanic
            </li>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
            <li>
              <Link to="/ServicesPage">Services</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            {/* <li>
              <Link to="/video">Video</Link>
            </li>
            <li>
              <Link to="/accessories">Accessories</Link>
            </li> */}
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Modal for logout confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to logout?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{ background: "red" }}
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={confirmLogout}
            style={{ marginLeft: "20px", background: "green" }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
