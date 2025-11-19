import React from "react";

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
      {/* Product List */}
      {!hoveredCategory && (
        <div
          className="product-container bg-white bg-opacity-75 rounded shadow-lg"
          style={{
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div className="row g-4 m-2">
            {sortedProducts && sortedProducts.length > 0 ? (
              sortedProducts.slice(0, visible).map((product) => (
                <div
                  key={product.id}
                  className="col-md-4 d-flex align-items-stretch justify-content-center mb-4"
                >
                  <div className="card shadow h-80 w-100">
                    <img
                      src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
                      alt={product.product_name}
                      className="card-img-top productimage"
                    />

                    <div className="card-body">
                      <h5 className="card-title fw-bold fs-4">
                        {product.product_name}
                      </h5>
                      <p className="card-text">
                        <span className="text-success fw-bold">Description: </span>
                        {product.product_description}
                      </p>
                      <h5>
                        <span className="text-warning fw-bold">Category: </span>
                        {product.product_category}
                      </h5>
                      <h3>
                        <span className="text-danger fw-bold">Price: </span>
                        KSH {product.product_cost}
                      </h3>
                    </div>

                    <div className="card-footer">
                      <button
                        onClick={() =>
                          navigate("/mpesapayment", { state: { product } })
                        }
                        className="btn btn-dark w-100 mt-2"
                      >
                        Purchase Now
                      </button>

                      <button
                        className="btn btn-warning w-100 mt-2"
                        onClick={() => {
                          setSelectedProduct(product);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Edit Product
                      </button>

                      <button
                        className="btn btn-danger w-100 mt-2"
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
    </div>
  );
};

export default ProductCard;
