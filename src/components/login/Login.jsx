import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import {Phone,UserRound,Mail,MoveRight,Lock,Check,Eye,EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const usenaviagte = useNavigate()
  const [inputs, SetInputs] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({})
  const [account, setAccount] = useState(false)



  function validate() {
    const newErrors = {};
    const { email, password } = inputs;

    // 2. Email validation
    if (email.trim() === "") {
      newErrors.email = "Email is required";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }


  async function handleFormSubmit(e) {
    e.preventDefault();

    const isvalid = validate();

    if (!isvalid) return;

    try {
      const url = "https://contact-pro-1.onrender.com/api/users/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inputs),
      })
      const data = await res.json()

      if (res.status === 400 && data.success === false) {
        setAccount(true)
        SetInputs({
          email: "",
          password: "",
        });
        throw new Error(data.error)
      }
      else if (!res.ok) {
        throw new Error(data.error || "Login failed")
      }

      SetInputs({
        email: "",
        password: "",
      });

      SetInputs({
        email: "",
        password: "",
      })

      usenaviagte("/dashboard", {
        state: {
          name: data.name,
        },
      });


    } catch (err) {
      return alert(err.message)
    }
  }



  function handleChange(e) {
    const { name, value } = e.target
    SetInputs((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
    setErrors((prev) => {
      return {
        ...prev,
        [name]: ""
      }
    })
  }


  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-brand">
       
          <div className="brand-icon"> <Phone /></div>
              
          <h2>Contact Management Syatem</h2>

          <p>
            All your contacts, one place.
            <br />
            Stay organized and connected.
          </p>

          <div className="brand-features">
            <div><Check /> Easy contact management</div>
            <div><Check /> Secure account access</div>
            <div><Check /> Quick and simple workflow</div>
          </div>

          <div className="brand-decoration">
            <span><UserRound /></span>
            <span><Mail /></span>
            <span><Phone /></span>
          </div>
        </div>

        <form className="login-form" onSubmit={handleFormSubmit}>
          <div className="login-heading">
            <span className="welcome-badge">WELCOME BACK</span>
            <h1>Login</h1>
            <p>Login to manage your contacts</p>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="login-error">{errors.email}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="password-box">
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
                {showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}
              </button>
            </div>

            {errors.password && (
              <p className="login-error">{errors.password}</p>
            )}
          </div>

          <button className="login-submit" type="submit">
          Login <MoveRight /> 
          </button>

          {account && (
            <p className="register-prompt">
              Don't have an account?{" "}
              <Link to="/registation">Register</Link>
            </p>
          )}

          <div className="login-footer">
            <span><Lock className='lock' /></span>
             
            Your contacts, organized in one place.
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
