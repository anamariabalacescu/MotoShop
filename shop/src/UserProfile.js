import {React, useState, Component} from 'react'
import Stack from 'react-bootstrap/Stack';
import circle from './img/circle.png';
import { Container, Row, Button, Col, Form } from 'react-bootstrap';
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { useUser } from './hooks/useUser.js';
import './styles/UserProfile.css'
import UserProfileContainer from './UserProfileContainer.js';

function UserProfile() {
  const { user } = useUser();

  return (
    <div>
      <Row>
        <Col md={3}><UserProfileContainer/></Col>    
        <Col md={9} >
          <Stack gap={4} className='stackdata'>
              <h2>Your profile <GiFullMotorcycleHelmet/></h2>
              
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{user.address}</td>
                  </tr>
                  <tr>
                    <th>Type</th>
                    <td>{user.type}</td>
                  </tr>
                </thead>
              </table>
{/* 
              <div className="d-flex justify-content-center">
              
                <Button variant='outline-light' className='upgrade'>  
                  <GiFullMotorcycleHelmet/>Edit profile
                </Button>

              </div> */}
            </Stack>
        </Col>
      </Row>          
    </div>
  )
}

export default UserProfile;