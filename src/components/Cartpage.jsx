import React from "react";
import { useCart } from "./useCart";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.product_cost * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 border-bottom p-2">
              <div>
                <h5>{item.product_name}</h5>
                <p>Qty: {item.quantity}</p>
              </div>
              <div>
                <h5>KSH {item.product_cost * item.quantity}</h5>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: KSH {total}</h3>
          <button className="btn btn-danger me-2" onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
