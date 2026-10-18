import React, { useState } from 'react'
import Header from '../../AdminPanel/Header'
import ContactForm from '../ContactForm'
import { useLocation } from 'react-router'
const UpdateContact = () => {
  const [errors, setErrors] = useState({})
  const location = useLocation()
  const [result,setResult]=useState("")
  function validate(inputs) {
    const newErrors = {};
    const { name, phone, category, city } = inputs;

    if (name.trim() === "") {
      newErrors.name = "name is required"
    }

    if (phone.trim() === "") {
      newErrors.phone = "number is required"
    } else if (!/^[6-9]\d{9}$/.test(inputs.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (city.trim() === "") {
      newErrors.city = "city is required"
    }
    if (category.trim() === "" || category === undefined) {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  async function updateContact({ inputs, setInputs }) {

    const isValid = validate(inputs)
    if (!isValid) return;

    try {
      const url = `https://contact-pro-qy1a.onrender.com/api/contacts/update/${location.state?.contactId}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inputs)
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error)
      }
      setResult(data.message)
       setInputs({
        name: "",
        phone: "",
        address: "",
        city: "",
        category: ""
      })

    } catch (err) {
      return setResult(err.message);
    }
  }
  return (
    <div className="admin-panel">
      <Header />
      <div className="main-layout">
        <main className="content">
          <div className="content1" >
            <ContactForm
              heading="Update Contact"
              btn_text="Update Contact"
              getData={updateContact}
              error={{ errors, setErrors }}
              result={{result,setResult}}
            />
          </div>

        </main>
      </div>
    </div>
  )
}

export default UpdateContact