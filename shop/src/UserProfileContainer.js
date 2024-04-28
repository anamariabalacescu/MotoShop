import React from 'react'
import circle from './img/circle.png';
import { Container, Row, Button, Col, Form } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import './styles/UserProfile.css'
import {Navigate} from 'react-router-dom';
import {useUser} from './hooks/useUser.js';
import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import AddProductModal from './AddProductModal.js';
const UserProfileContainer = () => {
  const { user } = useUser();

  const [showModal, setShowModal] = useState(false);

  const handleAddNewProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
        <div>
            <Stack direction="vertical" gap={2} className='stack'>
                <img src={circle}/>
                <Button as="a" variant="outline-light" className='button'> Your Profile </Button>
                {
                  // Conditional rendering based on user type
                  user.type === 'producer' ? (
                    <>
                      <Button as="a" variant="outline-light" onClick={handleAddNewProduct} className='button'>
                        Add New Product
                      </Button>
                      <AddProductModal show={showModal} handleClose={handleCloseModal} />
                    </>
                  ) : null
                }
                {/* <Button as="a" variant="outline-light" className='button'> Favourites </Button> */}
                <Button as="a" variant="outline-light" className='button'> Your Orders </Button>
                {/* <Button as="a" variant="outline-light" className='button'> Store credit </Button>
                <Button as="a" variant="outline-light" className='button'> Delivery addresses </Button> */}
                <Button as={NavLink} to="/userSettings" variant="outline-light" className='button'> Account settings </Button>
            </Stack>  
        </div>
    </div>
  )
}

export default UserProfileContainer