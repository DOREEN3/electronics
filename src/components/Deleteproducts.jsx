import axios from 'axios'
import React, { useState } from 'react'

const Deleteproducts = ({product,onClose,onDelete}) => {
    // define state to delete product 
    const[id,setId]=useState("")
  

    // define states for deleting product
    const [success,setSuccess]=useState("")
    const[error,setError]=useState("")
    const [loading,setLoading]=useState("")


    // define  function to delete 
    const deleteProduct = async () => {
        if (!id) {
          setError("Please enter a product ID.")
          return
        }
    
        setLoading("Deleting product...")
        setSuccess("")
        setError("")
    
        try {
          const response = await axios.delete(
            "https://doreen98.pythonanywhere.com/api/delete_product",
            {
              data: { id }, // Pass data here for DELETE
              withCredentials: true,
            }
          )
    
          setSuccess(response.data.message || "Product deleted successfully.")
          setLoading("")
          onDelete?.()
          onClose?.()
        } catch (err) {
          setError(err.response?.data?.error || err.message)
          setLoading("")
        }
      }
  return (
    <div className="card p-3 mb-4">
        <h3 className="text-primary text-center">Delete Product</h3>
        {loading && (
    <div className="text-center text-warning">
        <div className="spinner-border" role="status"></div>
            <p>{loading}</p>
    </div>
    )}
    <h4 className="text-success">{success}</h4>
    <h4 className="text-danger">{error}</h4>

    <input
        type="number"
        className="form-control mb-2"
        placeholder="Product Id"
        value={id}
        onChange={(e) =>setId(e.target.value)
        }
      />
      {product.product_photo && (
        <div className="mb-3 text-center">
            
          <img src={`https://doreen98.pythonanywhere.com${product.product_photo}`}  alt={product.product_name} 
          
            style={{ width: "150px", borderRadius: "5px" }}
            />
        </div>
      )}

     
        <div className="d-flex gap-2">
        <button
            className="btn btn-success"
            onClick={deleteProduct}
            disabled={loading !== ""}
            >
            {loading ? "Saving..." : "Save Changes"}
            </button>

        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>


    </div>
  )
}

export default Deleteproducts
