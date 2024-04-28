import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './styles/AddProductModal.css';
import Product from './schemas/Product';
import { Services } from './Services/Services';
const AddProductModal = ({ show, handleClose}) => {
  const [productData, setProductData] = useState({
    price: '',
    name: '',
    type: '',
    description: '',
    producerId: '',
    imageFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      imageFile: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(productData);
    // handleClose();
  };

  const handleAddProduct = (productData) => {
    console.log("Adding new product:", productData);
    
    const product = new Product({
        price: productData.price,
        name: productData.name,
        type: productData.type,
        description: productData.description,
        producerId: productData.producerId
    });

    Services.Product.create(productData.imageFile, product).then((response) => {
        console.log('Product added:', response);
        }).catch((error) => {
            console.error('Error adding product:', error);
        });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product type"
              name="type"
              value={productData.type}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProducerId">
            <Form.Label>Producer ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter producer ID"
              name="producerId"
              value={productData.producerId}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Form.Group>
          <div style={{display:'flex', justifyContent: 'flex-end'}}>
            <Button variant="primary" type="submit" style={{marginBlock: '10px', justifyContent:'right', justifyItems:'right', textAlign:'right'}}>
                Add Product
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
