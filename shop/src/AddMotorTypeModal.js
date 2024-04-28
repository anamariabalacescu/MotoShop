import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMotorTypes } from './hooks/useMotorTypes';

const AddMotorTypeModal = ({ show, handleClose,addNewMotorType }) => {
    const [motorTypeData, setMotorTypeData] = useState({
        type: ''
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMotorTypeData({
        ...motorTypeData,
        [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddMotorType(motorTypeData);
        // handleClose();
    };
    
    const handleAddMotorType = (motorTypeData) => {
        console.log("Adding new motor type:", motorTypeData);
        addNewMotorType(motorTypeData);
        setMotorTypeData({type: ''});
        handleClose();
    };
    
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Motor Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMotorTypeName">
                <Form.Label>Type</Form.Label>
                <Form.Control
                type="text"
                name="type"
                value={motorTypeData.type}
                onChange={handleChange}
                required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Motor Type
            </Button>
            </Form>
        </Modal.Body>
        </Modal>
    );
    };
export default AddMotorTypeModal;