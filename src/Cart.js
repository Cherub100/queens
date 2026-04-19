import React from 'react';

function Cart({ cartItems, onRemove }) {
  // Group items by name and src
  const grouped = cartItems.reduce((acc, item) => {
    const key = item.name + item.src;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1, indices: [acc.count || 0] };
      acc.count = (acc.count || 0) + 1;
    } else {
      acc[key].quantity += 1;
      acc[key].indices.push(acc.count || 0);
      acc.count = (acc.count || 0) + 1;
    }
    return acc;
  }, {});
  delete grouped.count;
  const groupedItems = Object.values(grouped);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="cart modern-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {groupedItems.map((item, idx) => (
            <li key={item.name + item.src} className="cart-item">
              <img src={item.src} alt={item.name} width={54} height={54} className="cart-thumb" />
              <div className="cart-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-qty">${item.price} x {item.quantity}</span>
              </div>
              <button className="cart-remove" onClick={() => onRemove(cartItems.findIndex((cartItem) => cartItem.name === item.name && cartItem.src === item.src))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total-row">
        <span className="cart-total-label">Total:</span>
        <span className="cart-total-value">${total}</span>
      </div>
    </div>
  );
}

export default Cart;
