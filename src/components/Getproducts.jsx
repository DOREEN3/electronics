import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Updateproducts from "./Updateproducts"; // import the new file
import Deleteproducts from './Deleteproducts';


const Getproducts = () => {
   // define 3 state to get product 
  const[products,setProducts]=useState([])
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")

 
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);

  
  

  // define function to get product 
  const getProducts= async()=>{
    setLoading("Loading products...")

    // get products 
    try {
      const response=await axios.get("https://doreen98.pythonanywhere.com/api/get_product")
      setProducts(response.data)
      setLoading("")
      
    } catch (error) {
      setError(error.message)
      setLoading("")
      
    }
    

  }
 


 

   useEffect(() => {
  getProducts();
    }, []);

  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/';
  return (
    <div className="container-fluid">
      <h2 className="text-primary text-center p-2">Available Products</h2>
      <h3 className="text-warning">{loading}</h3>
      <h3 className="text-danger">{error}</h3>

       {/* Update Form (shown only if a product is selected) */}
      {selectedProduct && (
        <Updateproducts
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={getProducts}
        />
      )}

      {/* --- Delete Product Modal --- */}
      {deleteProduct && (
        <Deleteproducts
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onDelete={getProducts}
        />
      )}

         
      
      <div className="row">
        {products.map((product,index)=>(
        <div key={index} className="col-md-4 d-flex align-items-stretch justify-content-center mb-4">
          <div className="card shadow h-100 card-margin">
          
              <img src={`https://doreen98.pythonanywhere.com${product.product_photo}`}

                alt={product.product_name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">{product.product_description}</p>

            </div>
             <div className="card-footer">
               <button>Purchase Now</button>
                <button
                  className="btn btn-warning"
                  onClick={() => setSelectedProduct(product)}
                >
                  Edit Product
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => setDeleteProduct(product)}
                  >
                    Delete
                  </button>
              </div>
           
          </div>
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default Getproducts
