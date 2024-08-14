// Profile.js
import React ,{useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import './Profile.css';

export default function Profile()
 {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
  

    <div className="profile-container">
      <h1>Create Your Profile</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label >Upload Image</Form.Label>
          <Form.Control type="file"  onChange={handleImageChange}/>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />
          )}
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="formBasicContact">
          <Form.Label>Contact No</Form.Label>
          <Form.Control type="text" placeholder="Enter your contact number" />
        </Form.Group>

        <Form.Group controlId="formBasicBio">
          <Form.Label>About Us/Bio</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Write something about yourself" />
        </Form.Group>

        <Form.Group controlId="formBasicSkills">
          <Form.Label>Mechanic Skills</Form.Label>
          <Form.Control type="text" placeholder="Enter your mechanic skills" />
        </Form.Group>

        <Form.Group controlId="formBasicCertification">
          <Form.Label>Mechanic Certification</Form.Label>
          <Form.Control type="text" placeholder="Enter your mechanic certification" />
        </Form.Group>

        <Form.Group controlId="formBasicRates">
          <Form.Label>Hourly Rates</Form.Label>
          <Form.Control type="text" placeholder="Enter your hourly rates" />
        </Form.Group>

        <Button className='btn' variant="primary" type="submit">
          Create Profile
        </Button>
      </Form>
    </div>
  );
}
