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
    const [existingEmail,setExistingEmail]=useState("")
    const [existingUsername,setExistingUsername]=useState("")
    // state to validate the input 
    const [errors,setErrors]=useState({})

   

    // declare 3 states for posting data 
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    const [loading,setLoading]=useState("")

   
    
      
     // input validation
     const validateEmail=(email)=>{
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
     }

    const validateUsername=(username)=>{
        return /^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(username)
    }
    const validatePassword=(password)=>{
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)
    }
    const validatePhone=(phone)=>{
        return /^(?:\+254|0)(7\d{8}|1\d{8})$/.test(phone)
    }

    // check if the input meet the validation criteria 
    const validateField=(name,value)=>{
        switch(name){
            case "username":
                return validateUsername(value)
                ? ""
                : "Username must be 3-20 characters,letters,numbers,underscore only."

            case "email":
                return validateEmail(value)
                ? ""
                : "Enter a valid email address"

            case "phone" :
                return validatePhone(value)
                ? ""
                : "Phone must be Kenyan format (0712345678 or +254712345678)."

            case "password" :
                return validatePassword(value)
                ? ""
                : "Password must contain uppercase, lowercase, number, special character, 8+ chars."

            default:
                return "";
        }
           
    }

    // check if the form is valid 
    const isFormValid=
    Object.values(errors).every((e) => e === "") &&
    Object.values(formData).every((v) => v !== "");

    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
      
          setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
          }));
        };

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
            const response=await axios.post("https://doreen98.pythonanywhere.com/api/signup2",envelopeData)
            setSuccess(response.data.message)
            // reset 
            setLoading("")
        } catch (error) {
            setError(error.response?.data?.error || error.message)

            // check if username and email exist
           
             if (error.includes("Email")) {
                setExistingEmail(formData.email);
            }
            if (error.includes("Username")) {
                setExistingUsername(formData.username);
            }
    


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
                  onChange={handleChange}/>
                  {existingUsername && <p className='text-danger'>Username is already taken</p>}
                  {errors.username && <p className="text-danger">{errors.username}</p>}<br /> <br />
            <label htmlFor="email">Email :
             
            </label> <br />
            <input type="email"
                name='email'
                required
                value={formData.email}
                 placeholder='Enter your email'
                  className="rounded px-2 w-100 py-2 "
                  onChange={handleChange}  />
                  {existingEmail && <p className='text-danger'>Email already exist</p>}
                  {errors.email && <p className='text-danger'>{errors.email}</p>} <br /> <br />
            <label htmlFor="password"> Password : 
              
            </label>  <br />
            <input type="password"
                name='password'
                required
                value={formData.password}
                 placeholder='Enter password...'
                  className="rounded px-2 w-100 py-2 " 
                  onChange={handleChange} />
                  {errors.password && <p className='text-danger'>{errors.password}</p>}<br /> <br />
            <label htmlFor="phone">Phone :
               
            </label> <br /> 
            <input type="tel"
                name='phone'
                required
                value={formData.phone}
                 placeholder='Enter phone number...'
                  className="rounded px-2 w-100 py-2 " 
                  onChange={handleChange} />
                  {errors.phone && <p className='text-danger'>{errors.phone}</p>}<br /> <br />
            <button  type='submit' className='btn btn-primary rounded  w-100 py-2' disabled={isFormValid}>Submit</button> <br />
            <p  className='mt-2 mx-4 fs-5 fw-bold'>Have an account ? <Link to="/signin">Sign In</Link></p>
            
            </fieldset>
        </form>
    </div>
  )
}

export default Signup
