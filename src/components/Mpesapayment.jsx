import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './Cartcontext';

const Mpesapayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  // Check if a single product was passed via state
  const product = location.state?.product || null;

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // If no product → calculate total cart amount
  const totalCart = cart.reduce(
    (sum, item) => sum + Number(item.product_cost) * item.quantity,
    0
  );

  const amountToPay = product ? Number(product.product_cost) : totalCart;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Processing payment...");

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("amount", amountToPay);

    try {
      const response = await axios.post(
        "http://doreen98.pythonanywhere.com/api/mpesa_payment",
        formData
      );
      setSuccess(response.data.message);
      setLoading("");
    } catch (error) {
      setError(error.message);
      setLoading("");
    }
  };

  return (
    <div className="row justify-content-center mt-4 mb-5">
      {showToast && (
        <div className="alert alert-success text-center">
          Product added to cart!
        </div>
      )}

      <div className="col-md-6 rounded shadow card p-4">
        <h1 className="text-info text-center">Lipa na Mpesa</h1>
        <h3 className="text-success">{success}</h3>
        <h3 className="text-info">{loading}</h3>
        <h3 className="text-danger">{error}</h3>

        {/* Only show product info if a single product was passed */}
        {product && (
          <>
            <img
              src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
              alt={product.product_name}
              className="mt-4 productimage"
            />

            <div className="card-body">
              <h4 className="text-primary fw-bold">{product.product_name}</h4>
              <h5 className="text-warning fst-italic">
                <span className="fw-semibold text-dark">Category: </span>
                {product.product_category}
              </h5>

              <p>
                <span className="fw-semibold fs-5">Description: </span>
                {product.product_description.slice(0, 100)}
              </p>

              <h4 className="text-danger fs-5">
                <span className="fw-semibold">Price: </span>KSH {product.product_cost}
              </h4>
            </div>
          </>
        )}

        {/* If no product, show cart summary */}
        {!product && (
          <div className="card-body">
            <h4 className="text-primary fw-bold">Cart Checkout</h4>
            <h5 className="text-danger fs-5">
              Total Amount: KSH {totalCart.toLocaleString()}
            </h5>
          </div>
        )}

        {/* MPESA PAYMENT FORM */}
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter phone 254xxxxxxxxx"
            className="form-control fs-6"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />

          <input
            type="number"
            className="form-control fs-6"
            value={amountToPay}
            disabled
          />

          <button className="btn btn-dark w-100 mt-3">Pay Now</button>

          {/* Only show "Add to Cart" if a single product is shown */}
          {product && (
            <button
              type="button"
              className="btn btn-warning w-100 mt-2"
              onClick={() => {
                addToCart(product);
                setShowToast(true);
                setTimeout(() => {
                  setShowToast(false);
                  navigate("/cart");
                }, 2000);
              }}
            >
              Add to Cart
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Mpesapayment;

