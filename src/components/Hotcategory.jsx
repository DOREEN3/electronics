import React from "react";

const Hotcategory = ({
  hotCategory,
  products,
  categories,
  setHotCategory,
  setHoveredCategory,
  navigate,
  setSelectedProduct,
  setDeleteProduct,
  hoveredCategory,
}) => {
  return (
    <>
      

      {/* === HOT CATEGORIES CARD === */}
      <div className="card my-4 shadow-lg border-0">
        <div className="card-header bg-danger text-white text-center fs-4 fw-bold">
          🔥 Hot Categories
        </div>

        <div className="card-body">
          <div className="row text-center">
            {/* HOT CATEGORY BUTTONS */}
            {categories.slice(0, 5).map((cat, index) => (
              <div key={index} className="col-6 col-md-2 mb-3">
                <div
                  className="p-3 bg-dark text-white rounded shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setHotCategory(cat);
                    setHoveredCategory(null);
                  }}
                >
                  <h6 className="fw-bold">{cat}</h6>
                </div>
              </div>
            ))}
          </div>

          {/* === SELECTED HOT CATEGORY PRODUCTS === */}
          {hotCategory && (
            <div className="row mt-4">
              <h4 className="text-center text-primary mb-3">
                Products in: {hotCategory}
              </h4>

              {products
                .filter((p) => p.product_category === hotCategory)
                .map((product) => (
                  <div
                    key={product.id}
                    className="col-md-4 d-flex align-items-stretch justify-content-center mb-4"
                  >
                    <div className="card shadow h-100 w-100">
                      <div className="product-img-wrapper">
                      <img
                        src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
                        alt={product.product_name}
                        className=" productimage"
                       
                      />
                        </div>

                      <div className="card-body">
                        <h5 className="card-title fw-bold">{product.product_name}</h5>
                        <p className="card-text">
                          <span className="text-success fw-bold">Description: </span>
                          {product.product_description}
                        </p>
                        <h6>
                          <span className="text-warning fw-bold">Category: </span>
                          {product.product_category}
                        </h6>
                        <h4 className="text-danger fw-bold">
                          KSH {product.product_cost}
                        </h4>
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
                          onClick={() => setSelectedProduct(product)}
                        >
                          Edit Product
                        </button>

                        <button
                          className="btn btn-danger w-100 mt-2"
                          onClick={() => setDeleteProduct(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hotcategory;
