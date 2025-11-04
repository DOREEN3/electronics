import React, { useState } from 'react'
import axios from 'axios';

const Addproducts = () => {
  const[formData,setFormData]=useState({
    product_name:"",
    product_description :"",
    product_cost : "",
    product_category : "",
  
  })
  // define state for posting data 
  const [success,setSucess]=useState("")
  const[error,setError]=useState("")
  const[loading,setLoading]=useState("")

  const [productPhoto, setProductPhoto] = useState(null);

  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData , [name] :value})
  }

  const handleFileChange = (e) => {
    setProductPhoto(e.target.files[0]);
  };

  // define function to add product 
  const handleSubmit= async (e)=>{
    e.preventDefault()
    setLoading("Please wait...")

    // define an empty envelope 
    const envelopeData = new FormData()
    
    // append data 
    envelopeData.append("product_name",formData.product_name)
    envelopeData.append("product_description",formData.product_description)
    envelopeData.append("product_cost",formData.product_cost)
    envelopeData.append("product_category",formData.product_category)
    envelopeData.append("product_photo",productPhoto)

    // post data 
    try {
      const response=await axios.post("https://doreen98.pythonanywhere.com/api/add_product2",envelopeData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // include the Flask session cookie
      })
      setSucess(response.data.message)
      // reset loading 
      setLoading("")
    } catch (error) {
      setError(error.message)
      // reset loading 
      setLoading("")
      
    }


  }

  const imagepath = 'https://doreen98.pythonanywhere.com/static/images/';
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center p-5'>
      <form onSubmit={handleSubmit} className="border shadow rounded w-50 p-4">
        <fieldset>
        <legend className='fw-bold fs-3 text-center'>Upload Product</legend>

        {/* bind the state  */}
        <h3 className="text-warning">{loading}</h3>
        <h3 className="text-success">{success}</h3>
        <h3 className="text-danger">{error}</h3>
        
        <label htmlFor="name">Product Name :
          
        </label> <br />
        <input type="text" 
          placeholder="Enter product name..."
          name='product_name'
          required
          value={formData.product_name}
          onChange={handleChange}
          className="form-control"
           /> <br /><br />
        <label htmlFor="description">Product Description :
         
        </label> <br />
        <input type="text" 
          placeholder="Describe your product..."
          name='product_description'
          required
          value={formData.product_description}
          onChange={handleChange}
          className="form-control"
           /> <br /><br />
        <label htmlFor="cost">Product Cost :
         
        </label> <br />
        <input type="number" 
          placeholder="Enter product cost..."
          name='product_cost'
          required
          value={formData.product_cost}
          onChange={handleChange}
          className="form-control"
           /> <br /><br />
        <label htmlFor="photo"> Browse / Upload Product Image
         
        </label> <br />
        <input type="file" 
          placeholder="Enter product photo..."
          name='productPhoto'
          accept='image/*'
          required
          onChange={handleFileChange}
          className="form-control"
           /> <br /><br />
        <button className="btn btn-primary rounded  w-100 py-2">Upload Product</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Addproducts