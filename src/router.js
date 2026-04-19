
import React, { useState, useEffect } from 'react';
import App from './App.js';
import CartPage from './CartPage.js';

function Router() {
  const [page, setPage] = useState('shop');
  const [cart, setCart] = useState([]);

  // Preload PayPal SDK as soon as app loads
  useEffect(() => {
    if (!window.paypal && !document.getElementById('paypal-sdk')) {
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };
  const handleRemoveFromCart = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };
  const handlePay = () => {
    setCart([]);
    setPage('shop');
  };

  return page === 'shop' ? (
    <App cart={cart} onAddToCart={handleAddToCart} onCheckout={() => setPage('cart')} />
  ) : (
    <CartPage
      cartItems={cart}
      onRemove={handleRemoveFromCart}
      onPay={handlePay}
      onBack={() => setPage('shop')}
    />
  );
}

export default Router;
