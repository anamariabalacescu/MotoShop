import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Services } from './Services/Services';

const ItemPage = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [producer, setProducer] = useState(null);

  useEffect(() => {
    Services.Product.getById(itemId).then((item) => {
      setItem(item);
        Services.User.getProducerById(item.producerId).then((producer) => {
            setProducer(producer);
        });
    });
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <img src={item.imageUrl} alt="product image" />
        <h1>{item.name}</h1>
        <p>Category: {item.type}</p>
        <p>Price: ${item.price}</p>
        <p>Producer: {producer.name}</p>
        <p>Description: {item.description}</p>
    </div>
  );
};

export default ItemPage;
