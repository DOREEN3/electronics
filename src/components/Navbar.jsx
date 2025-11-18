import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./Cartcontext";

const Navbar = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-md" style={{ backgroundColor: "green" }}>
      <div className="container-fluid">
        <Link to="/index.html" className="navbar-brand fs-4 fw-bold">
          <b className="text-warning">Electro</b>
          <span className="text-danger">Mart</span>
        </Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav gap-3 ms-auto align-items-center">
            <li className="navbar-item">
              <Link to="/index.html" className="nav-link active fs-6">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/addelectronics" className="nav-link fs-6">Add Products</Link>
            </li>
            <li className="navbar-item">
              <Link to="/signup" className="nav-link fs-6">Sign Up</Link>
            </li>
            <li className="navbar-item">
              <Link to="/signin" className="nav-link fs-6">Sign In</Link>
            </li>

            {/* Cart Icon */}
            <li className="navbar-item position-relative">
              <Link to="/cart" className="nav-link">
                <i className="bi bi-cart-fill" style={{ fontSize: "1.5rem", color: "yellow" }}></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
