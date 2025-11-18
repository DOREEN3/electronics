import React, { useState, useEffect } from "react";
import axios from "axios";
import Updateproducts from "./Updateproducts";
import Deleteproducts from "./Deleteproducts";
import { useNavigate } from "react-router-dom";




const Getproducts = () => {
  const navigate = useNavigate();

  // Product states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");




  // Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Category hover
  const [hoveredCategory, setHoveredCategory] = useState(null);
 //hot category
 const [hotCategory, setHotCategory] = useState(null);

 // Pagination state
const [visible, setVisible] = useState(6); // initial number of products to show

// states for price sorting
const [sortDirection,setSortDirection]=useState("asc")
const [sortByField,setSortByField]=useState("product_cost")


  // Fetch products
  const getProducts = async () => {
    setLoading("Loading products...");
    try {
      const response = await axios.get(
        "https://doreen98.pythonanywhere.com/api/get_product2"
      );
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setError(error.message);
      setLoading("");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
  console.log("API DATA:", products);
}, [products]);

  // Filtered list (used when NOT hovering)
  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Categories list
  const categories = [...new Set(products.map((p) => p.product_category))];

  // Category-hover products OR search results
  const categoryProducts = hoveredCategory
    ? products.filter((p) => p.product_category === hoveredCategory)
    : filteredProducts;

    const sortedProducts = [...categoryProducts].sort((a, b) => {
      if (!sortDirection || !sortByField) return 0; // no sorting
    
      if (sortDirection === "asc") {
        return a[sortByField] - b[sortByField];
      } else if (sortDirection === "desc") {
        return b[sortByField] - a[sortByField];
      }
      return 0;
    });
    

  return (
    <div className="container-fluid text-white">
      <div className="bg-white">
        <h2 className="text-primary text-center p-2">Available Products</h2>
        <h3 className="text-warning">{loading}</h3>
        <h3 className="text-danger">{error}</h3>

     
            {/* Search & Sort */}
            <div className="row g-3 justify-content-center mb-5 " style={{ marginLeft: "50px", width: "100%" }}>
            {/* Search Input */}
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="I'm looking for..."
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    setShowModal(value.trim().length > 0);
                  }}
                />
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => searchTerm.trim() !== "" && setShowModal(true)}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            {/* Sort Select */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={sortDirection}
                onChange={(e) => {
                  setSortByField("product_cost");
                  setSortDirection(e.target.value);
                  setVisible(9);
                }}
              >
                <option value="">Price</option>
                <option value="desc">Highest Price</option>
                <option value="asc">Lowest Price</option>
              </select>
            </div>
       
                {/* Delete Modal */}
            {deleteProduct && (
              <Deleteproducts
                product={deleteProduct}
                onClose={() => setDeleteProduct(null)}
                onDelete={getProducts}
              />
            )}



        {/* Update Modal */}
        {selectedProduct && (
          <Updateproducts
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onUpdated={getProducts}
          />
        )}
      </div>
     


      <div className="bg-dark">
        <div className="row align-items-start g-0">
          
          {/* Sidebar (Categories) — unchanged */}
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

          {/* Carousel + Products (Carousel untouched) */}
          <div className="col-md-9 position-relative">
            {/* === Carousel (unchanged) === */}
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
                    src="assets/electronic3.jpeg"
                    className="d-block w-100"
                    style={{ height: "500px" }}
                    alt="electronics"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="assets/kitchen.jpeg"
                    className="d-block w-100"
                    style={{ height: "500px" }}
                    alt="kitchen"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="assets/television.jpeg"
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
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* Hover Overlay */}
            {hoveredCategory && (
              <div
                className="position-absolute top-0 start-0 w-100 bg-dark bg-opacity rounded shadow"
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
                          <img
                            src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
                            className="card-img-top"
                            style={{ height: "150px", objectFit: "cover" }}
                            alt={product.product_name}
                          />
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

          {/* === HOT CATEGORIES CARD === */}
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
              setHoveredCategory(null);  // make sure sidebar hover closes
            }}
            
          >
            <h6 className="fw-bold">{cat}</h6>
          </div>
        </div>
      ))}

    </div>

    {/* === HOT CATEGORY PRODUCT DETAILS === */}
    {hotCategory && (
      <div className="row mt-4">
        <h4 className="text-center text-primary mb-3">
          Products in: {hoveredCategory}
        </h4>

        {products
          .filter((p) => p.product_category === hotCategory)
          .map((product) => (
            <div
              key={product.id}
              className="col-md-4 d-flex align-items-stretch justify-content-center mb-4"
            >
              <div className="card shadow h-100 w-100">
                <img
                  src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
                  alt={product.product_name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />

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
                {sortedProducts.length > 0 ? (
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
                            onClick={() => {setSelectedProduct(product);
                              window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls to top smoothly
                            }}
                            
                          >
                            Edit Product
                          </button>

                          <button
                            className="btn btn-danger w-100 mt-2"
                            onClick={() => {setDeleteProduct(product);
                              window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls to top smoothly
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
        </div>
      </div>
    {visible < categoryProducts.length && (
  <div className="text-center mt-4">
    <button
      className="btn btn-primary mb-4 "
      style={{width:"250px"}}
      onClick={() => setVisible((prev) => prev + 4)} // show 4 more products
    >
      Show More
    </button>
  </div>
)}

    </div>
    </div>
  );
};

export default Getproducts;