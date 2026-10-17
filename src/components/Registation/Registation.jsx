import React, { useState } from 'react'; import './Registation.css';
import { useNavigate } from 'react-router';
import {MoveRight,Eye,EyeOff } from "lucide-react";
const Registation = () => { 
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setConfirmPassword] = useState(false);
const usenavigate=useNavigate()
const [errors,setErrors]=useState({})
const [inputs,setInputs] =useState({
     name:"",
     email:"",
     password:"",
     confirmPassword:""
});


function validate(){
     const newErrors = {};
     const { name, email, password, confirmPassword } = inputs;
       // 1. Name validation
       if(name.trim()===""){
          newErrors.name="Name is required";
       }else if(name.trim().length<3){
          newErrors.name = "Name must be at least 3 characters";
       }
     // 2. Email validation
      if (email.trim() === "") {
    newErrors.email = "Email is required";
     }
     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) 
     {
      newErrors.email = "Please enter a valid email";
  }
    // 3. Password validation
   if (password === "") {
    newErrors.password = "Password is required";
  } else if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }
   else if (!/[A-Z]/.test(password)) {
    newErrors.password = "Password must contain an uppercase letter";
  } else if (!/[a-z]/.test(password)) {
    newErrors.password = "Password must contain a lowercase letter";
  } else if (!/[0-9]/.test(password)) {
    newErrors.password = "Password must contain a number";
  }
    // 4. Confirm password validation
    if (confirmPassword === "") {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }
     setErrors(newErrors);
return Object.keys(newErrors).length === 0;  
}


async function handleFormSubmit(e){
     e.preventDefault()
   
   const isValid=validate()

   if(!isValid){
     return;
   }
     try{   
     const url="http://localhost:3000/api/users/register";
     const res=await fetch(url,{
          method:"POST",
           headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body:JSON.stringify(inputs),
      })

    await res.json();
     
      if(!res.ok){
     throw new Error("Registration failed");
      }
      setInputs({
     name:"",
     email:"",
     password:"",
     confirmPassword:""
     })
     usenavigate("/dashboard")
   
     }catch(err){
      
       return alert(err.message);
     }

       
}

function handleChange(e){
     const {value,name}=e.target;
     setInputs((prev)=>{
          return{
           ...prev,
          [name]:value
          }
     })
     setErrors((prev) => ({
      ...prev,
          [name]: ""
     }));

}


return ( 
     <div className="registation-container">
     <form className="registation-form" onSubmit={handleFormSubmit} > 
        <h5>Registration Form</h5> 
     <p className="form-subtitle">Create your account</p>

     <div className="input-group">
     <label htmlFor="name">Name</label>
      <input type="text"
       placeholder="Enter your name" 
       id="name" 
       name="name"
       value={inputs.name}
       onChange={handleChange} 
       /> 
     {errors.name && (
    <p className="error">{errors.name}</p>
     )}
      </div>

     <div className="input-group"> 
    <label htmlFor="email">Email</label>
     <input type="email" 
     placeholder="Enter your email"
      id="email" 
      name="email" 
     value={inputs.email}
     onChange={handleChange}
      />
      {errors.email && (
          <p className="error">{errors.email}</p>
          )}
      </div>

     <div className="input-group">
     <label htmlFor="password">Password</label> 
     <div className="password-container">
      <input
     type={showPassword ? "text" : "password"}
     placeholder="Enter your password"
     id="password"
     name="password" 
     value={inputs.password}
     onChange={handleChange}
     />  
        <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
              >
              {showPassword ?<Eye/> : <EyeOff /> }
              </button>
     </div>
        {errors.password && (
          <p className="error">{errors.password}</p>
          )}
     </div>
      
      
      <div className="input-group">
     <label htmlFor="ConfirmPassword">Confirm Password</label> 
     <div className="password-container">
      <input
     type={showConfirmPassword ? "text" : "password"}
     placeholder="Confirm your password" 
     id="ConfirmPassword"
    name="confirmPassword" 
     value={inputs.confirmPassword} 
     onChange={handleChange}
     />  
        <button
            type="button"
            className="toggle-password"
            onClick={() => setConfirmPassword(!showConfirmPassword )}
              >
              {showConfirmPassword  ?<Eye/> : <EyeOff /> }
              </button>
     </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
          )}
     </div>        


     <div className="registation-btn">
     <button type="submit">
          Create Account <MoveRight />
          </button> 
     </div> 
     </form> 
</div>);
 };

export default Registation;







