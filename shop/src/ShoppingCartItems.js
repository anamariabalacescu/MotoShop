import React, { useState } from 'react';

const ShoppingCartItems = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', quantity: 1 },
    { id: 2, name: 'Product 2', quantity: 1 },
    { id: 3, name: 'Product 3', quantity: 1 }
  ]);
  const [cartTabPosition, setCartTabPosition] = useState(0);

  const addItem = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove item if quantity is 0
    setCartItems(updatedCartItems);
  };

  const toggleCartTab = () => {
    setCartTabPosition(prevPosition => prevPosition === 0 ? -300 : 0);
  };

  return (
    <div className='cartTab' style={{ transform: `translateX(${cartTabPosition}px)` }}>
      <h1 className='cart-title' style={{ marginLeft: cartTabPosition + 120 }}>Shopping Cart</h1>
      <div className='listCart' style={{ marginLeft: cartTabPosition + 120 }}>
        {cartItems.map(item => (
          <div className='item' key={item.id}>
            <span>{item.name}</span>
            <span>Quantity: {item.quantity}</span>
            <button onClick={() => addItem(item.id)}>+</button>
            <button onClick={() => removeItem(item.id)}>-</button>
          </div>
        ))}
      </div>
      <div className="btn">
        <button className='checkOut' variant='outline-light'>Check Out</button>
        <button className='close' variant='outline-light' onClick={toggleCartTab}>CLOSE</button>
      </div>
    </div>
  );
};

export default ShoppingCartItems;
