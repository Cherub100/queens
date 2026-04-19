import React, { useRef, useEffect } from 'react';
import Cart from './Cart.js';

// Add onBack prop for navigation
function CartPage({ cartItems, onRemove, onPay, onBack }) {
  const paypalRef = useRef();

  useEffect(() => {
    if (cartItems.length > 0 && window.paypal && paypalRef.current) {
      paypalRef.current.innerHTML = '';
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: cartItems.reduce((sum, item) => sum + item.price, 0).toString(),
              },
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            onPay();
          });
        },
      }).render(paypalRef.current);
    }
  }, [cartItems, onPay]);

  // PayPal SDK is now preloaded in router.js

  return (
    <div className="app-container">
      <header className="modern-header">
        <span
          className="back-icon"
          style={{
            cursor: 'pointer',
            fontSize: '1.7rem',
            marginRight: 18,
            color: '#fc575e',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
          }}
          onClick={onBack}
          title="Back to shop"
        >
          ←
        </span>
        <h1 style={{margin: 0}}>
          <span role="img" aria-label="cart">🛒</span> Kings & Queens Jeweries
        </h1>
      </header>
      <Cart cartItems={cartItems} onRemove={onRemove} />
      {cartItems.length > 0 && (
        <div style={{marginTop: 32, textAlign: 'center'}}>
          <div ref={paypalRef}></div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
