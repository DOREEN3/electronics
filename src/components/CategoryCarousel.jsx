import React from "react";

const CategoryCarousel = ({ hoveredCategory, products, setHoveredCategory, categories }) => {
  return (
    <div className="bg-dark">
      <div className="row align-items-start g-0">
        {/* Sidebar */}
       
        <div className="col-md-3" style={{ marginTop: "-30px" }}>
          <div
            className="bg-dark p-3 rounded shadow-sm position-sticky"
            style={{ top: "90px" }}
          >
            <h4 className="text-center text-info p-3 bg-danger">Categories</h4>
            <ul className="list-group">
              {categories.map((cat, idx) => (
                <li
                  key={idx}
                  className={`list-group-item ${
                    hoveredCategory === cat ? "bg-secondary text-white" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Carousel & Hover Overlay */}
        <div className="col-md-9 position-relative">
          {/* Carousel */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide mb-4"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
              ></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="assets/electronic3.webp"
                  className="d-block w-100"
                  style={{ height: "500px" }}
                  alt="electronics"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/kitchen.png"
                  className="d-block w-100"
                  style={{ height: "500px" }}
                  alt="kitchen"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/television.jpg"
                  className="d-block w-100"
                  style={{ height: "500px" }}
                  alt="television"
                />
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon bg-danger"></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon bg-danger"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Hover Overlay */}
          {hoveredCategory && (
            <div
              className="position-absolute top-0 start-0 w-100 bg-dark bg-opacity-90 rounded shadow p-3"
              style={{ zIndex: 1000, minHeight: "300px", overflowY: "auto" }}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <h4 className="text-info text-center mb-3">{hoveredCategory}</h4>
              <div className="row">
                {products
                  .filter((p) => p.product_category === hoveredCategory)
                  .map((product) => (
                    <div key={product.id} className="col-md-4 mb-3">
                      <div className="card bg-secondary text-white h-100">
                        <div className="product-img-wrapper">
                        <img
                          src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
                          className="productimage"
                          alt={product.product_name}
                        />
                          </div>
                        <div className="card-body">
                          <h6 className="card-title">{product.product_name}</h6>
                          <p className="card-text small">
                            {product.product_description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
