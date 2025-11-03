import React, { useState } from "react";
import axios from "axios";

const UpdateProduct = ({ product, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    id: product.id,
    product_name: product.product_name,
    product_description: product.product_description,
    product_cost: product.product_cost,
    product_category: product.product_category,
  });


  const [productPhoto, setProductPhoto] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success,setSuccess]=useState("")

  const updateProduct = async () => {
    setLoading("Updating product...");

    const envelopeData = new FormData();
    envelopeData.append("id", formData.id);
    envelopeData.append("product_name", formData.product_name);
    envelopeData.append("product_description", formData.product_description);
    envelopeData.append("product_cost", formData.product_cost);
    envelopeData.append("product_category", formData.product_category);
    envelopeData.append("product_photo", productPhoto);
   
    // update product 

    try {
      const response = await axios.post(
        "https://doreen98.pythonanywhere.com/api/update_product",
        envelopeData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // include the Flask session cookie
        }
      );
      
      setSuccess(response.data.message)
      setLoading("");
      onUpdated(); // refresh product list
      onClose();   // close form
    } catch (err) {
      setError(err.message);
      setLoading("");
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4 className="text-primary">Update Product</h4>
      {loading && (
  <   div className="text-center text-warning">
    <div className="spinner-border" role="status"></div>
    <p>{loading}</p>
  </div>
)}

      <h5 className="text-danger">{error}</h5>
      <h5 className="text-success">{success}</h5>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Name"
        value={formData.product_name}
        onChange={(e) =>
          setFormData({ ...formData, product_name: e.target.value })
        }
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Description"
        value={formData.product_description}
        onChange={(e) =>
          setFormData({ ...formData, product_description: e.target.value })
        }
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Cost"
        value={formData.product_cost}
        onChange={(e) =>
          setFormData({ ...formData, product_cost: e.target.value })
        }
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Category"
        value={formData.product_category}
        onChange={(e) =>
          setFormData({ ...formData, product_category: e.target.value })
        }
      />
      {product.product_photo && (
        <div className="mb-3 text-center">
          
         <img src={`https://doreen98.pythonanywhere.com${product.product_photo}`} alt={product.product_name} 

        
            style={{ width: "150px", borderRadius: "5px" }}
            />
        </div>
      )}

      <input
        type="file"
        className="form-control mb-2"
        onChange={(e) => setProductPhoto(e.target.files[0])}
      />

      <div className="d-flex gap-2">
        <button
            className="btn btn-success"
            onClick={updateProduct}
            disabled={loading !== ""}
            >
            {loading ? "Saving..." : "Save Changes"}
            </button>

        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
