import React from "react";
import { useCart } from "./Cartcontext";
import {Link} from "react-router-dom"

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
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 text-center text-primary">My Cart</h2>

      <div className="card shadow-sm p-3 p-md-4">
        {cart.map((item) => {
          const price = Number(item.product_cost);
          const subTotal = price * item.quantity;

          return (
            <div
              key={item.id}
              className="
                d-flex flex-column flex-md-row 
                justify-content-between align-items-md-center
                mb-3 p-3 border rounded
              "
            >
              {/* LEFT SIDE: IMAGE + NAME */}
              <div className="d-flex align-items-center mb-3 mb-md-0">
                <img
                  src={`https://doreen98.pythonanywhere.com${item.product_photo}`}
                  alt={item.product_name}
                  className="me-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <h6 className="mb-1">{item.product_name}</h6>
                  <p className="mb-0 text-muted">
                    KSH {price.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE: QUANTITY + SUBTOTAL + REMOVE */}
              <div className="d-flex flex-column flex-md-row align-items-md-center">
                <div className="d-flex align-items-center mb-2 mb-md-0 me-md-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={item.quantity <= 1}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>

                  <span className="mx-3">{item.quantity}</span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <h6 className="text-center text-md-start me-md-3 mb-2 mb-md-0">
                  KSH {subTotal.toLocaleString()}
                </h6>

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

        <div className="
          d-flex flex-column flex-md-row
          justify-content-between align-items-md-center mt-4
        ">
          <h4 className="text-center text-md-start mb-3 mb-md-0">
            Total: KSH {total.toLocaleString()}
          </h4>

          <div className="text-center text-md-end">
            <button className="btn btn-warning me-2 mb-2 mb-md-0" onClick={clearCart}>
              Clear Cart
            </button>

           <Link to="/mpesapayment" className="btn btn-success">
              Proceed to Checkout
            </Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;


