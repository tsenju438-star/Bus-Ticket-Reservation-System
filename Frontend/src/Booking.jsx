import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from "axios";
import './Booking.css'

function Booking() {

    const location = useLocation();
    const navigate=useNavigate();

    const bus = location.state?.bus;
    console.log(bus);

    const [form,setForm]=useState({
    passengerName:"",
    age:"",
    gender:"",
    mobile:"",
    email:"",
    seatsBooked:"",
    dateOfTravel:""
});

    const handleChange=(e)=>{
        setForm({
            ...form,[e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const booking = {
                ...form,
                busId: bus.busId
            };

            const response = await axios.post(
                "http://localhost:8080/api/bookings",
                booking
            );

            const oldBookings = JSON.parse(localStorage.getItem("bookings")) || [];

            oldBookings.push(response.data);

            localStorage.setItem("bookings", JSON.stringify(oldBookings));

            alert("Booking Successful");
            navigate("/")

        } catch (error) {
            console.error(error);
            alert("Booking Failed");
        }
    };
    

    return (
        <div className='bus-section'><h1>Booking Page</h1>
        <div className='booking'>
            <div>
                <h2>Bus Info</h2>
            <div className='businfo'>

            <h2>{bus.busNumber}</h2>

            <p>
                {bus.source} ➡️ {bus.destination}
            </p>

            <p>
                Seats Available:{bus.seatsAvailable}
            </p>

            <p>
                Departure: {bus.departureTime}
            </p>

            <p>
                Arrival: {bus.arrivalTime}
            </p>
            </div>
            </div>

            <div className='book'>
                <h2>Passenger details</h2>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" name='passengerName' placeholder='passengername' required onChange={handleChange}/>
                    <input type="number" name="age" placeholder='age' required onChange={handleChange}/>
                    <section>
                    <label htmlFor="gender" required>gender</label>
                    <input type="radio" value='male' name='gender' id='male' onChange={handleChange}/>
                    <label htmlFor="male">male</label>
                    <input type="radio" value='female' name='gender' id='female' onChange={handleChange}/>
                    <label htmlFor="female" >female</label>
                    <input type="radio" value='other' name='gender' id='others' onChange={handleChange}/>
                    <label htmlFor="others">others</label>
                    </section>
                    <input type="tel" name="mobile" placeholder='mobile number' required minLength='10' maxLength='10' onChange={handleChange}/>
                    <input type="email" name='email' placeholder='email' required onChange={handleChange}/>
                    <input type="date" name="dateOfTravel" required onChange={handleChange}/>
                    <input type="number" placeholder='no of seats' name='seatsBooked' required min='1' onChange={handleChange}/>
                    <button type='submit'>book</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Booking