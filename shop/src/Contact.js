import React, { useState, useRef } from 'react';
import './styles/Contact.css';
import { Container, Row, Form, FormGroup, Button, Col  } from 'react-bootstrap';
import { PiMotorcycleFill } from "react-icons/pi";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const formRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a new FormData object from the form element
    const formData = new FormData(formRef.current);
  
    // Extract individual form fields from the FormData object
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('description'); // Use 'description' for the message field
  
    // Here you can handle sending the email using a backend service or API
    emailjs
      .sendForm('service_7stwrz5', 'template_8yefj3z', formRef.current, {
        name,
        email,
        subject,
        message,
        publicKey: 'zY4pVgGQkN_MplJco',
      })
      .then(
        () => {
          alert('Your message has been sent!');
          console.log('SUCCESS!');
        },
        (error) => {
          alert(error.text);
          console.log('FAILED...', error.text);
        },
      );
  
    console.log('Form submitted:', { name, email, subject, message });
  
    // You can also reset the form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      description: '' // Use 'description' for the message field
    });
  };
  
  return (
    <>
    <Container style={{ 
      maxWidth: '500px', margin: 'auto', padding: '20px', color:'white',
       boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Contact Us</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px' }} className='anim'><i>Let us know how you want to ride!<PiMotorcycleFill/></i></p>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Row style={{margin:10}}>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{margin:10}}>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{margin:10}}>
          <Col>
            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{margin:10}}>
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    <div className="video-container">
    <video
      className="video"
      src="./img/comercial_hd.mp4"
      autoPlay
      muted
      loop
      controls
    />
    <h2 className="overlay-text">Come <i>RIDE</i> with us!</h2>
  </div>
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.2753235332007!2d8.354149992312621!3d47.03482798958438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478ff97abd71a689%3A0xb7d5c232889d07c4!2sMeggenhornstrasse%2053%2C%206045%20Meggen%2C%20Switzerland!5e0!3m2!1sen!2sro!4v1713764470500!5m2!1sen!2sro"
        width="600"
        height="450"
        style={{ borderRadius:10, width: '60%', marginTop: '20px' }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default Contact;