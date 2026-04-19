import React from 'react';

import './App.css';

const images = [
  'photo_2026-04-19_17-03-54.jpg',
  'photo_2026-04-19_17-04-35.jpg',
  'photo_2026-04-19_17-04-44.jpg',
  'photo_2026-04-19_17-04-52.jpg',
  'photo_2026-04-19_17-05-17.jpg',
  'photo_2026-04-19_17-05-28.jpg',
  'photo_2026-04-19_17-05-38.jpg',
  'photo_2026-04-19_17-05-49.jpg',
  'photo_2026-04-19_17-05-58.jpg',
  'photo_2026-04-19_17-06-07.jpg',
  'photo_2026-04-19_17-06-17.jpg',
  'photo_2026-04-19_17-06-27.jpg',
  'photo_2026-04-19_17-06-34.jpg',
  'photo_2026-04-19_17-06-48.jpg',
  'photo_2026-04-19_17-06-49.jpg',
  'photo_2026-04-19_17-07-04.jpg',
  'photo_2026-04-19_17-07-12.jpg',
  'photo_2026-04-19_17-07-19.jpg',
  'photo_2026-04-19_17-07-32.jpg',
  'photo_2026-04-19_17-07-40.jpg',
];

const prices = [1, 20, 10, 50, 15, 100, 150, 200, 500, 5, 150];

const getPrice = (idx) => {
  if (idx === 0) return prices[0];
  return prices[(idx - 1) % (prices.length - 1) + 1];
}



// App expects: cart, onAddToCart, onCheckout as props
function App({ cart, onAddToCart, onCheckout }) {
  return (
    <div className="app-container">
      <header className="modern-header">
        <h1>
          <span role="img" aria-label="jewelry">💎</span> Kings & Queens Jeweries
        </h1>
        <div className="cart-summary" onClick={onCheckout} title="View Cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cart.length}</span>
        </div>
      </header>
      <div className="products">
        {images.map((img, idx) => (
          <div className="product-card" key={img}>
            <img
              src={"images/" + img}
              alt={"Jewelry " + (idx + 1)}
            />
            <h3>Jewelry #{idx + 1}</h3>
            <p className="product-price">${getPrice(idx)}</p>
            <button onClick={() => onAddToCart({
              name: `Jewelry #${idx + 1}`,
              price: getPrice(idx),
              src: "images/" + img
            })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {cart && cart.length > 0 && (
        <button
          className="floating-checkout"
          onClick={onCheckout}
        >
          Checkout ({cart.length} item{cart.length > 1 ? 's' : ''}) - $
          {cart.reduce((sum, item) => sum + item.price, 0)}
        </button>
      )}
    </div>
  );
}

export default App;
