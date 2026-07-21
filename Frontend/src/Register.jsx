import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '/src/Register.css'
import axios from 'axios';

function Register() {

  const [form,setForm]=useState({
    username:"",
    mobile:"",
    password:""
  })

  const navigate=useNavigate();

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const res=await axios.post("http://localhost:8080/user/register",form)
    alert(res.data.message);
    if(res.data.includes("Registered successfully"))
      {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      }
  }

  return (
    <div className='register'>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <img src="/src/images/logo.jpg" alt="" />
                <h1>BUSGO</h1>
            </div>
            <input type="text" name='username' placeholder='UserName' required onChange={handleChange}/>
            <input type="tel" name='mobile' placeholder='Mobile Number' required onChange={handleChange}/>
            <input type="password" name='password' placeholder='Password' required onChange={handleChange}/>
            <button type="submit">Register</button>
            <p>or</p>
            <Link to='/login'>Already have an account?</Link>
        </form>
    </div>
  )
}

export default Register