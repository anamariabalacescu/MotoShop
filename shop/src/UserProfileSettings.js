import React, { useState } from 'react';
import { useUser } from './hooks/useUser.js';
import UserProfileContainer from './UserProfileContainer.js';
import {Col, Row, Button} from 'react-bootstrap';
import './styles/UserSettings.css';
const UserProfileSettings = () => {
  // State variables to store user data
  const [setUserData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });

  const {user} = useUser();

  // Event handler for input changes
  const handleInputChange = (e) => {
   
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    
  };

  return (
    <div>
      <Row>
      <Col md={3}><UserProfileContainer/></Col>
      <Col md={9}>
        <h2>User Profile Settings</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
            />
          </div>
          <Button variant="outline-light" type="submit">Save Changes</Button>
        </form>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfileSettings;
