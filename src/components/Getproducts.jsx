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
 


 

   useEffect(() => {
  getProducts();
    }, []);

  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/';
  return (
    <div className="container-fluid bg-black ">
      <h2 className="text-primary text-center p-2">Available Products</h2>
      <h3 className="text-warning">{loading}</h3>
      <h3 className="text-danger">{error}</h3>
      <div>
        <input type="text" placeholder='Iam looking for...' />
        <button type='button'></button>
      </div>

       {/* Update Form (shown only if a product is selected) */}
      {selectedProduct && (
        <Updateproducts
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={getProducts}
        />
      )}

      {/* carousel  */}
      
          <div id="carouselExampleIndicators" 
              className="carousel slide" 
              data-bs-ride="carousel" 
              data-bs-interval="3000">

        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="assets/electronic3.jpeg" className="d-block w-100" alt="electronics" />
          </div>
          <div className="carousel-item">
            <img src="assets/kitchen.jpeg" className="d-block w-100" alt="kitchen" />
          </div>
          <div className="carousel-item">
            <img src="assets/television.jpeg" className="d-block w-100" alt="television" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

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
                <h5>{product.product_category}</h5>
                <h3>{product.product_cost}</h3>

            </div>
             <div className="card-footer">
               <button 
               onClick={()=>navigate("/mpesapayment",{state: {product}})}
               className='btn btn-dark w-100 mt-2'>Purchase Now</button>
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
