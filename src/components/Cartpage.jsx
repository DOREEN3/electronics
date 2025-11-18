import React from "react";
import { useCart } from "./Cartcontext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product_cost) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-primary">My Cart</h2>
        <p className="fs-5 mt-3">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 text-center text-primary">My Cart</h2>

      <div className="card shadow-sm p-4">
        {cart.map((item) => {
          const price = Number(item.product_cost);
          const subTotal = price * item.quantity;

          return (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded"
            >
              <div className="d-flex align-items-center">
                <img
                  src={`https://doreen98.pythonanywhere.com${item.product_photo}`}
                  alt={item.product_name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "15px",
                  }}
                />

                <div>
                  <h5 className="mb-1">{item.product_name}</h5>
                  <p className="mb-0 text-muted">KSH {price.toLocaleString()}</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center me-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={item.quantity <= 1}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>

                  <span className="mx-2">{item.quantity}</span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <h5 className="me-3">
                  KSH {subTotal.toLocaleString()}
                </h5>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        <hr />

        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4>Total: KSH {total.toLocaleString()}</h4>

          <div>
            <button className="btn btn-warning me-2" onClick={clearCart}>
              Clear Cart
            </button>

            <button className="btn btn-success">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
