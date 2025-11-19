import React, { useState, useEffect,useMemo } from "react";
import axios from "axios";
import Updateproducts from "./Updateproducts";
import Deleteproducts from "./Deleteproducts";
import Hotcategory from "./Hotcategory";
import CategoryCarousel from "./CategoryCarousel";
import ProductCard from "./ProductCard";
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

  // Category hover & hot category
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hotCategory, setHotCategory] = useState(null);

  // Pagination
  const [visible, setVisible] = useState(6);

  // Sorting
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortByField, setSortByField] = useState("product_cost");

  // Fetch products
  const getProducts = async () => {
    setLoading("Loading products...");
    try {
      const response = await axios.get(
        "https://doreen98.pythonanywhere.com/api/get_product2"
      );
      setProducts(response.data);
      setLoading("");
    } catch (err) {
      setError(err.message);
      setLoading("");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products by search term
 const filteredProducts = useMemo(() => {
  return products.filter((product) =>
    product.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [products, searchTerm]);



  // Unique categories
  const categories = [...new Set(products.map((p) => p.product_category))];

  // Products to display (category hover OR search)
 const categoryProducts = useMemo(() => {
  return hoveredCategory
    ? products.filter((p) => p.product_category === hoveredCategory)
    : filteredProducts;
}, [hoveredCategory, filteredProducts]);
  
  // Sorted products
  const sortedProducts = useMemo(() => {
  if (!sortDirection || !sortByField) return categoryProducts;
  return [...categoryProducts].sort((a, b) =>
    sortDirection === "asc"
      ? a[sortByField] - b[sortByField]
      : b[sortByField] - a[sortByField]
  );
}, [categoryProducts, sortDirection, sortByField]);
  
  return (
    <div className="container-fluid text-white">
      {/* Header */}
      <div className="bg-white text-center">
        <h2 className="text-primary p-2">Available Products</h2>
        {loading && <h3 className="text-warning">{loading}</h3>}
        {error && <h3 className="text-danger">{error}</h3>}
      </div>

      {/* Search & Sort */}
      <div
        className="row g-3 justify-content-center mb-5"
        style={{  width: "90%" }}
      >
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

        <div className="col-md-3">
          <select
            className="form-select"
            value={sortDirection}
            onChange={(e) => {
              setSortByField("product_cost");
              setSortDirection(e.target.value);
  
            }}
          >
            <option value="">Price</option>
            <option value="desc">Highest Price</option>
            <option value="asc">Lowest Price</option>
          </select>
        </div>
      </div>

      {/* Modals */}
      {deleteProduct && (
        <Deleteproducts
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onDelete={getProducts}
        />
      )}
      {selectedProduct && (
        <Updateproducts
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={getProducts}
        />
      )}

      {/* Main Section */}
      <div className="bg-dark position-relative">
        
          {/* Sidebar */}
         
            <CategoryCarousel
              hoveredCategory={hoveredCategory}
              products={products}
              setHoveredCategory={setHoveredCategory}
              categories={categories}
            />
        
        <div className="row">
          {/* Hot Categories */}
          <div className="col-md-12">
            <Hotcategory
              hotCategory={hotCategory}
              products={products}
              categories={categories}
              hoveredCategory={hoveredCategory}
              setHotCategory={setHotCategory}
              setHoveredCategory={setHoveredCategory}
              navigate={navigate}
              setSelectedProduct={setSelectedProduct}
              setDeleteProduct={setDeleteProduct}
            />

            {/* Product Grid */}
            <ProductCard
              visible={visible}
              setVisible={setVisible}
              sortedProducts={sortedProducts}
              categoryProducts={categoryProducts}
              hoveredCategory={hoveredCategory}
              setSelectedProduct={setSelectedProduct}
              setDeleteProduct={setDeleteProduct}
              navigate={navigate}
              loading={loading}
            />
          </div>
        </div>
      </div>
      </div>
  )
};

export default Getproducts;

