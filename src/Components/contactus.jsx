import React from 'react'
import { Form, Button } from 'react-bootstrap';
import "./contactus.css";

import backgroundImage from './assets/male-mechanics-working-together-car-shop.jpg'; // Import the image file
export default function ContactUs() {
  return (
    <>
    
      <div className='bgImg' style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    
      <div className="contact-us">
        <h2>Contact Us</h2>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>
    
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
    
          <Form.Group controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
          </Form.Group>
    
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
        
      </div>
      
    </>
    
  )
}
