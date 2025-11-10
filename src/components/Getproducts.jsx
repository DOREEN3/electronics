import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Updateproducts from "./Updateproducts"; // import the new file
import Deleteproducts from './Deleteproducts';
import { useNavigate } from 'react-router-dom';


const Getproducts = () => {

  const navigate= useNavigate()
   // define 3 state to get product 
  const[products,setProducts]=useState([])
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")

 
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);

    // define state for sorting 
    const [searchTerm,setSearchTerm]=useState("")
    const [inputValue,setInputValue]=useState("")

    // state for category hover 

    const [hoveredCategory, setHoveredCategory] = useState(null);
  

  // define function to get product 
  const getProducts= async()=>{
    setLoading("Loading products...")

    // get products 
    try {
      const response=await axios.get("https://doreen98.pythonanywhere.com/api/get_product2")
      setProducts(response.data)
      setLoading("")
      
    } catch (error) {
      setError(error.message)
      setLoading("")
      
    }
    

  }
  // load products on mount 
  useEffect(() => {
  getProducts();
    }, []);

    // filter products 
    // filter products 
    const filteredProducts = products
    .filter((product) =>
      product.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Prioritize names that start with the search term
      const aStarts = a.product_name
        ?.toLowerCase()
        .startsWith(searchTerm.toLowerCase());
      const bStarts = b.product_name
        ?.toLowerCase()
        .startsWith(searchTerm.toLowerCase());
      return aStarts === bStarts ? 0 : aStarts ? -1 : 1;
    });


      // 🔸 Extract unique categories
  const categories = [...new Set(products.map((p) => p.product_category))];

  // 🔸 Products for hovered category
  const categoryProducts = hoveredCategory
    ? products.filter((p) => p.product_category === hoveredCategory)
    : filteredProducts;
  

  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/';
  return (
      <div className="container-fluid text-white">
        <div className='bg-white'>
        <h2 className="text-primary text-center p-2">Available Products</h2>
        <h3 className="text-warning">{loading}</h3>
        <h3 className="text-danger">{error}</h3>
  
        {/* Search input */}
        <div className="input-group  mb-5" style={{marginLeft:"250px",width:"70%",height:"50px"}}>
          <input
            type="text"
            className="form-control"
            placeholder="I'm looking for..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearchTerm(inputValue)}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => setSearchTerm(inputValue)}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
  
        {/* Update Form (if a product is selected) */}
        {selectedProduct && (
          <Updateproducts
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onUpdated={getProducts}
          />
        )}
        </div>
      <div className='bg-dark'>
        <div className="row align-items-start g-0" >
          {/* === Sidebar (Categories) === */}
          <div className="col-md-3" style={{marginTop:"-30px"}}>
            <div
              className="bg-dark p-3 rounded shadow-sm position-sticky"
             style={{top:"90px"}}
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
  
          {/* === Carousel + Products === */}
          <div className="col-md-9 position-relative">
            {/* Carousel */}
            <div
                id="carouselExampleIndicators"
                className="carousel slide mb-4"
                data-bs-ride="carousel"
                data-bs-interval="3000"
              >
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
                </div>

                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="assets/electronic3.jpeg" className="d-block w-100" style={{height:"500px"}} alt="electronics" />
                  </div>
                  <div className="carousel-item">
                    <img src="assets/kitchen.jpeg" className="d-block w-100" style={{height:"500px"}}alt="kitchen" />
                  </div>
                  <div className="carousel-item">
                    <img src="assets/television.jpeg" className="d-block w-100" style={{height:"500px"}} alt="television" />
                  </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

                          {/* === Hover Product Overlay (NEW) === */}
              {hoveredCategory && (
                <div
                  className="position-absolute top-0 start-0 w-100 bg-dark bg-opacity rounded shadow "
                  style={{
                    zIndex: 1000,
                    minHeight: "300px",
                    overflowY: "auto"
                  }}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <h4 className="text-info text-center mb-3">{hoveredCategory}</h4>
                  <div className="row">
                    {products
                      .filter((p) => p.product_category === hoveredCategory)
                      .map((product, i) => (
                        <div key={i} className="col-md-4 mb-3">
                          <div className="card bg-secondary text-white h-100">
                            <img
                              src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
                              className="card-img-top"
                              alt={product.product_name}
                              style={{ height: "150px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                              <h6 className="card-title">{product.product_name}</h6>
                              <p className="card-text small">{product.product_description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

  
            {/* Delete Modal */}
            {deleteProduct && (
              <Deleteproducts
                product={deleteProduct}
                onClose={() => setDeleteProduct(null)}
                onDelete={getProducts}
              />
            )}
            </div>
  
            {/* Product List */}

            {!hoveredCategory && (
              <div className='product-container bg-white bg-opacity-75 rounded shadow-lg'
              style={{
                position:"relative",
                zIndex:"0",
                backdropFilter:"blur(8px)",
                border:"1px solid rgba(255,255,255,0.2)"
              }}>
            <div className="row">
              {categoryProducts.length > 0 ? (
                categoryProducts.map((product, index) => (
                  <div
                    key={index}
                    className="col-md-4 d-flex align-items-stretch justify-content-center mb-4"
                  >
                    <div className="card shadow h-100 card-margin">
                      <img
                        src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
                        alt={product.product_name}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.product_name}</h5>
                        <p className="card-text">
                          {product.product_description}
                        </p>
                        <h5>{product.product_category}</h5>
                        <h3>{product.product_cost}</h3>
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
      </div>
    );
  }
  

export default Getproducts
