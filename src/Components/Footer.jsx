import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import img1 from "../images/pakbike1.jpg";

import { FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

function Footer() {
    return (
        <div>
            
            <div className="footer-container">
                <div className="footer-column" style={{ flex: '30px', textAlign: 'center' }}>
                    <form>
                        <div className="logo-container">
                        <img src={img1} alt="" style={{ width: '300px', height: '100px' }} />
                        </div>
                        <div>
                            <p>PakBike is an E-Commerce platform<br />
                            aimed at MotorBike Enthusiasts.</p>
                        </div>
                        <label>Follow us!</label>
                        <div className="mt-4">
                        <span style={{ padding: '5px' }}>
        <a href="#" className="btn btn-floating btn-light btn-lg"><i className="fab fa-facebook-f"></i></a>
    </span>
    <span style={{ padding: '5px' }}>
        <a href="#" className="btn btn-floating btn-light btn-lg"><i className="fab fa-twitter"></i></a>
    </span>
    <span style={{ padding: '5px' }}>
        <a href="#" className="btn btn-floating btn-light btn-lg"><i className="fab fa-instagram"></i></a>
    </span>
    <span style={{ padding: '5px' }}>
        <a href="#" className="btn btn-floating btn-light btn-lg"><i className="fab fa-linkedin-in"></i></a>
    </span>
                        </div>
                    </form>
                    <br />
                    <h4>PakBike, providing<br />what you need, all under one roof!</h4>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="footer-column" style={{ flex: '30px' }}>
                    <div className="location-container">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>
                            <h3>National</h3>
                            <h3>Incubation</h3>
                            <h3>Center</h3>
                            Department of<br />
                            Telecommunication &<br />
                            Engineering, UET, Taxila,<br />
                            Pakistan
                        </span>
                    </div>
                    <br />
                    <div className="useful-links">
                        <h3 className="useful-links-heading">Useful Links</h3>
                        <ul>
                            <li><a href="#">Home</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">Rent</a></li>
                            <br></br>
                           

                        </ul>
                        <ul>
                            <li><a href="#">Services</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">Blog</a></li>
                            <br></br>
                           

                        </ul>
                        <ul>
                            <li><a href="#">Our Team</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">FAQ</a></li>
                            <br></br>
                           

                        </ul>
                    </div>
                </div>
                <div className="footer-column" style={{ flex: '20px' }}>
                    <div className="phone-container">
                        <FaPhone style={{ color: 'green', fontSize: '24px' }} />
                        <span> &nbsp; 0334-8952612
                            <br></br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <h4>Give us a call!</h4></span>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="subscribe">
                        <h3 className="useful-links-heading">Subscribe</h3>
                        <br></br>
                       <p>Don't miss to subscribe to our news feeds!</p>
                    </div>
                    <div className="email-box">
                        <FaEnvelope className="email-icon" />
                        <input type="email" placeholder="Enter your email" />
                        <button className="send-button" onClick={() => alert('Email sent!')}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Footer;
