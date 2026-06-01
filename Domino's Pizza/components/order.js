import React from 'react';

const Order = ({ items = [], total = 0, status = 'Pending', onCancel }) => {
  return (
    <section className="order-summary">
      <h2>Order Summary</h2>
      {items.length === 0 ? (
        <p>No items in your order yet.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={`${item.id || index}-${item.name}`}>
              <span>{item.name}</span>
              <span>{item.quantity} × ${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="order-details">
        <p>Status: {status}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      {onCancel ? (
        <button type="button" onClick={onCancel}>
          Cancel Order
        </button>
      ) : null}
    </section>
  );
};

export default Order;
