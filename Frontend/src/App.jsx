import React from 'react'
import Nav from './Nav'
import Intro from './Intro'
import Search from './Search'
import Aside from './Aside'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import { Routes, Route } from "react-router-dom";
import Booking from "./Booking";
import Mybooking from './Mybooking'

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/mybooking" element={<Mybooking/>}/>
    </Routes>
    </div>
  )
}

export default App