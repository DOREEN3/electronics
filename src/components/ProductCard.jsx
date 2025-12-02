import React from "react";
import Chatbot from "./Chatbot";

const ProductCard = ({
  hoveredCategory,
  sortedProducts,
  visible,
  categoryProducts,
  navigate,
  setSelectedProduct,
  setDeleteProduct,
  loading,
  setVisible
}) => {
  return (
    <div>
      {!hoveredCategory && (
        <div
          className="product-container bg-white bg-opacity-75 rounded"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "10px"
          }}
        >
          <div className="row g-4 m-2">
            {sortedProducts && sortedProducts.length > 0 ? (
              sortedProducts.slice(0, visible).map((product) => (
                <div
                  key={product.id}
                  className="col-12 col-sm-6 col-md-4 d-flex mb-4"
                >
                  <div className="card shadow-sm w-100" style={{ minHeight: "100%" }}>
                    
                    <div className="product-img-wrapper">
                    <img
                      src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
                      alt={product.product_name}
                      className=" productimage"
                    
                    />
                      </div>

                    <div className="card-body">
                      <h5 className="card-title fw-bold fs-5">
                        {product.product_name}
                      </h5>

                      <p className="card-text" style={{ minHeight: "60px" }}>
                        <span className="text-success fw-bold">Description: </span>
                        {product.product_description}
                      </p>

                      <h6>
                        <span className="text-warning fw-bold">Category: </span>
                        {product.product_category}
                      </h6>

                      <h4 className="mt-2">
                        <span className="text-danger fw-bold">Price: </span>
                        KSH {product.product_cost}
                      </h4>
                    </div>

                    <div className="card-footer bg-white border-0">
                      <button
                        onClick={() =>
                          navigate("/mpesapayment", { state: { product } })
                       
                        }
                        className="btn btn-dark w-100 mb-2"
                      >
                        Purchase Now
                      </button>

                      <button
                        className="btn btn-warning w-100 mb-2"
                        onClick={() => {
                          setSelectedProduct(product);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Edit Product
                      </button>

                      <button
                        className="btn btn-danger w-100"
                        onClick={() => {
                          setDeleteProduct(product);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && (
                <h4 className="text-center text-warning">No products found.</h4>
              )
            )}
          </div>
        </div>
      )}

      {/* Show More Button */}
      {visible < (categoryProducts?.length || 0) && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary mb-4"
            style={{ width: "250px" }}
            onClick={() => setVisible((prev) => prev + 4)}
          >
            Show More
          </button>
        </div>
      )}
      <Chatbot
      botName="ElectroMart Bot"
      greetingMessage="Hi! I’m here to help you with orders and shipping."
      placeholder="Type your question..."
      botResponses={{
      hello: "Hello! How can I help you today?",
      delivery: "We deliver across the country! Call 0796651091 to place an order.",
      shipping: "Shipping fees are as low as Ksh.100. Free delivery around Nairobi.",
      bye: "Goodbye! Have a great day!",
  }}
/>

    </div>
  );
};

export default ProductCard;
