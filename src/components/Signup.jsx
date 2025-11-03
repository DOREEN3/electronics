import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    // declare states for form input 
    const[formData,setFormData] = useState({
        username :"",
        email:"",
        password:"",
        phone :""
    })

    // declare 3 states for posting data 
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    const [loading,setLoading]=useState("")

    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData({...formData , [name]:value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        setLoading("Please wait...")

        // define an empty envelope 
        const envelopeData=new FormData()
        // append 
        envelopeData.append("username",formData.username)
        envelopeData.append("email",formData.email)
        envelopeData.append("phone",formData.phone)
        envelopeData.append("password",formData.password)

        // post data
        try {
            const response=await axios.post("https://doreen98.pythonanywhere.com/api/signup",envelopeData)
            setSuccess(response.data.message)
            // reset 
            setLoading("")
        } catch (error) {
            setError(error.response?.data?.error || error.message)

            // reset 
            setLoading("")
            
        } 
    }
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center p-5'>

      
        <form onSubmit={handleSubmit} className='border rounded shadow p-4 w-50'>
            <fieldset>
                <legend className='text-center fs-3 fw-bold'>Sign Up</legend>
                  {/* bind the states  */}
                <h2 className="text-warning">{loading}</h2>
                <h2 className="text-success">{success}</h2>
                <h2 className="text-danger">{error}</h2>
            <label htmlFor="name" >Username:
              
            </label> <br /> 
            <input type="text"
                name='username'
                 placeholder='Enter your username ..'
                 required
                 value={formData.username}
                  className="rounded px-2 w-100 py-2 "  
                  onChange={handleChange}
                  /><br /> <br />
            <label htmlFor="email">Email :
             
            </label> <br />
            <input type="email"
                name='email'
                required
                value={formData.email}
                 placeholder='Enter your email'
                  className="rounded px-2 w-100 py-2 "
                  onChange={handleChange}  /> <br /> <br />
            <label htmlFor="password"> Password : 
              
            </label>  <br />
            <input type="password"
                name='password'
                required
                value={formData.password}
                 placeholder='Enter password...'
                  className="rounded px-2 w-100 py-2 " 
                  onChange={handleChange} /><br /> <br />
            <label htmlFor="phone">Phone :
               
            </label> <br /> 
            <input type="tel"
                name='phone'
                required
                value={formData.phone}
                 placeholder='Enter phone number...'
                  className="rounded px-2 w-100 py-2 " 
                  onChange={handleChange} /><br /> <br />
            <button  type='submit' className='btn btn-primary rounded  w-100 py-2'>Submit</button> <br />
            <p  className='mt-2 mx-4 fs-5 fw-bold'>Have an account ? <Link to="/signin">Sign In</Link></p>
            
            </fieldset>
        </form>
    </div>
  )
}

export default Signup