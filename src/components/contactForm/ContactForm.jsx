import react, { useState } from "react"

const ContactForm = (props) => {
  const { heading, btn_text,getData} = props;
  const {result,setResult}=props.result
  const {errors, setErrors}=props.error;

  const [inputs,setInputs]=useState({
    name:"",
    phone:"",
    address:"",
    city:"",
    category:""
  });

 function handleFormSubmit(e){
e.preventDefault();
 getData({inputs,setInputs});
 
}

function handleChange(e){

  const {value,name}=e.target;
  setInputs((prev)=>{
    return{
      ...prev,
      [name]:value
    }
  })
  setErrors((prev)=>{
    return{
      ...prev,
      [name]:""
    }
  })
  setResult("")

}
  return (
    <div className="contactForm-container">
      {result&& <p className="show-result">{result}</p>}
     
      <form className="contact-form" onSubmit={handleFormSubmit}>
        <h5 className="form-heading">
          {heading || "Add Contact"}
        </h5>

        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              id="name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              id="phone"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
              {errors.phone && (<p className="error">{errors.phone}</p>)}
          </div>

          <div className="input-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              placeholder="Enter address"
              name="address"
              value={inputs.address}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              placeholder="Enter city"
              id="city"
              name="city"
              value={inputs.city}
              onChange={handleChange}
            />
            {errors.city&& (<p className="error">{errors.city}</p>)}
          </div>

          <div className="input-group">
            <label htmlFor="category">Category</label>
            <select 
            id="category"
            name="category" 
            value={inputs.category}
             onChange={handleChange}
             >
              <option value="">Select Category</option>
              <option value="personal">Personal</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="work">Work</option>
              <option value="customer">Customer</option>
            </select>
            {errors.category && (<p className="error">{errors.category}</p>)}
          </div>
        </div>

        <div className="save-contact-container">
          <button type="submit">
            {btn_text || "Save Contact"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;



// import React from 'react'

// const ContactForm = (props) => {
//     const {heading,btn_text}=props
//   return (
//     <div className='contactForm-container'>
//       <form className='contact-form'>
//         <h5>{heading}</h5>
//         <div className='input-group'>
//                 <label htmlFor="name">Name</label>
//                 <input 
//                 type="text" 
//                 placeholder='Enter name'
//                 id='name' 
//                 />
//             </div>
//             <div className='input-group'>
//                 <label htmlFor="phone">Phone Number </label>
//                 <input 
//                 type="tel" 
//                 placeholder='Enter phone number'
//                 id='phone' 
//                 />
//             </div>
//              <div className='input-group'>
//                 <label htmlFor="address">Address</label>
//                  <textarea 
//                  id="address"
//                   placeholder="Enter address"/> 
//             </div>
//              <div className='input-group'>
//                 <label htmlFor="city">City</label>
//                 <input 
//                 type="text" 
//                 placeholder='Enter city'
//                 id='city' 
//                 />
//             </div>
//             <div className='input-group'>
//           <label htmlFor="category">Category</label>
//           <select id="category" name="category">
//             <option value="">Select Category</option>
//             <option value="personal">Personal</option>
//             <option value="family">Family</option>
//             <option value="friend">Friend</option>
//             <option value="work">Work</option>
//             <option value="customer">Customer</option>
//         </select>

//             </div>
//             <div className='save-contact-conatiner'>
//                 <button>{btn_text}</button>
//             </div>
//       </form>
//     </div>
//   )
// }

// export default ContactForm