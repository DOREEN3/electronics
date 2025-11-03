import React, { useState } from 'react'
import axios from 'axios'

const Signin = () => {

  // declare state to signin 
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  // declare state for posting data 
  const[loading,setLoading]=useState("")
  const[success,setSuccess]=useState("")
  const[error,setError]=useState("")

  // define function to handle signin 
  const handleSubmit= async (e)=>{
    e.preventDefault()
    setLoading("Please wait...")

    // define an empty envelope 
    const envelopeData=new FormData()

    // append
    envelopeData.append("email",email)
    envelopeData.append("password",password)

    // post data 
    try {
      const response=await axios.post("https://doreen98.pythonanywhere.com/api/signin",envelopeData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // include the Flask session cookie
        }
      )
      setSuccess(response.data.message)
      //reset
      setLoading("")
      
    } catch (error) {
      setError(error.message)
      // reset 
      setLoading("")
      
    }
  }

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center p-5'>
      <form onSubmit={handleSubmit} className='border rounded shadow p-4 w-50'>
        <fieldset>
          <legend className='text-center fs-3 fw-bold'>Sign In</legend>
          {/* bind the state variable  */}
          <h3 className="text-warning">{loading}</h3>
          <h3 className="text-success">{success}</h3>
          <h3 className="text-danger">{error}</h3>
          
          <label htmlFor="email" className='fs-5 fw-bold'>Email :
          </label> <br />
          <input type="email" 
            placeholder='Enter email ...' 
            value={email}
            name='email'
            required
            onChange={(e)=>setEmail(e.target.value)}
            className="rounded px-2 w-100 py-2 "
            /> <br /><br />
          <label htmlFor="password" className='fs-5 fw-bold'>Password : 
      
          </label> <br />
          <input type="password" 
            name='password'
            value={password}
            placeholder='Enter password...'
            required
            onChange={(e)=>setPassword(e.target.value)}
            className="rounded px-2 w-100 py-2 "
            /> <br /><br />
        <button type='submit' className="btn btn-primary rounded py-2 w-100">Sign In</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Signin