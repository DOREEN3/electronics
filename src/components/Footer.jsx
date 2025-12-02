import React from 'react';

const Footer = () => {
  const handleSubmit=(e)=>{
    e.preventDefault()
    alert("Message sent successful!")
  }
  return (
    <>
      <div className="container-fluid bg-success">
          <div className="row g-4">

      {/* About Us */}
      <div className="col-md-3">
        <h4 className="mb-3">About Us</h4>
        <p className="small">
          Welcome to ElectroMart — your trusted destination for the latest and
          most innovative electronics. We deliver technology that makes life
          easier, smarter, and more exciting.
        </p>

        <p className="small">
          Explore high-quality gadgets from top brands and emerging tech
          innovators. Upgrade your space with the best in modern tech.
        </p>
      </div>

      {/* Important Links */}
      <div className="col-md-3">
        <h4 className="mb-3">Important Links</h4>
        <ul className="list-unstyled small">
          <li><a href="/index.html" className="text-white text-decoration-none">Home</a></li>
          <li><a href="/signup" className="text-white text-decoration-none">Sign Up</a></li>
          <li><a href="/sinin" className="text-white text-decoration-none">Sign In</a></li>
          <li><a href="/addelectronics" className="text-white text-decoration-none">Add products</a></li>
          <li><a href="/cart" className="text-white text-decoration-none"> <i className="bi bi-cart-fill" style={{ fontSize: "1.5rem", color: "black" }}></i></a></li>
        </ul>
      </div>

      {/* Contact Us */}
      <div className="col-md-3">
        <h4 className="text-white text-center mb-3">Contact Us</h4>

        <input
          type="email"
          placeholder="Enter your email"
          className="form-control mb-3"
          required
        />

        <textarea
          placeholder="Leave a message"
          className="form-control mb-3"
          rows="3"
          required
        ></textarea>

        <button className="btn btn-danger w-100" onClick={handleSubmit}>
          Send Message
        </button>
      </div>

      {/* Stay Connected */}
      <div className="col-md-3">
        <h4 className="text-white text-center mb-3">Stay Connected</h4>

        <div className="d-flex justify-content-center mb-3">
          <img
            src="assets/fb.png"
            alt="facebook"
            className="mx-2"
            style={{ width: "35px" }}
          />
          <img
            src="assets/in.png"
            alt="instagram"
            className="mx-2"
            style={{ width: "35px" }}
          />
          <img
            src="assets/x.png"
            alt="x"
            className="mx-2"
            style={{ width: "35px" }}
          />
        </div>

        <p className="small">
          Stay updated with the latest tech trends, exclusive deals, and new
          arrivals. Join our community of tech lovers!
        </p>
      </div>
    </div>

      </div>

      <div className="container-fluid bg-dark">
        <p className="text-center small mb-0">
      © {new Date().getFullYear()} ElectroMart — All Rights Reserved.
        </p>
      </div>
    </>
  );
}


export default Footer;
