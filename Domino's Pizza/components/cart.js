import React from 'react';

export default function Cart({ items = [], onRemove = () => {}, onCheckout = () => {} }) {
  const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <section className="cart">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <strong>{item.name}</strong>
                  <p>{item.description || `${item.quantity} x $${(item.price || 0).toFixed(2)}`}</p>
                </div>
                <button type="button" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button type="button" className="checkout-button" onClick={onCheckout}>
            Checkout
          </button>
        </>
      )}
    </section>
  );
}
