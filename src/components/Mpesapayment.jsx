import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Mpesapayment = () => {
  const {product}=useLocation().state || {}
  // define state for mpesa payment 
  const[phone,setPhone]=useState("")
  const[amount,setAmount]=useState("")

  // define state for posting data 
  const[success,setSucess]=useState("")
  const[error,setError]=useState("")
  const[loading,setLoading]=useState("")

  const handleSubmit= async(e)=>{
    e.preventDefault()
    setLoading("Please wait...")

    // define an empty envelope
    const envelopeData=new FormData()

    // append 
    envelopeData.append("phone",phone)
    envelopeData.append("amount",product.product_cost)

    // post data 
    try {
      const response=await axios.post("http://doreen98.pythonanywhere.com/api/mpesa_payment",envelopeData)
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
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 rounded shadow card p-4">
        <h1 className="text-info text-center">Lipa na Mpesa</h1>
        <h3 className="text-success">{success}</h3>
        <h3 className="text-info">{loading}</h3>
        <h3 className="text-danger">{error}</h3>
        <img src={`https://doreen98.pythonanywhere.com${product.product_photo}`}
        alt={product.product_name}
        className='mt-4 productimage'
        />
     

      <div className="card-body  ">
              <h4 className='text-primary fw-bold'>{product.product_name}</h4>
              <h5 className='text-warning fst-italic'><span className="fw-semibold text-dark">Product Category: </span>{product.product_category}</h5>
              
              <p><span className="fw-semibold fs-5">Product Description: </span>{product.product_description.slice(0,100)}</p>
              <h4 className='text-danger fs-5'><span className="fw-semibold">Price: </span> KSH.{product.product_cost}</h4>

              <form onSubmit={handleSubmit}>
                  <input type="tel" placeholder='Enter phone 254xxxxx' className='form-control fs-5' onChange={(e)=>setPhone(e.target.value)} /> <br />
                  <input type="number"  className='form-control fs-5' value={product.product_cost} disabled/>
              <button className='btn btn-dark w-100 mt-2'>Purchase now</button>
              </form>

            </div>
            </div>
    </div>
  )
}

export default Mpesapayment