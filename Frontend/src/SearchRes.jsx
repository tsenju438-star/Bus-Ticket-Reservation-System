import React from 'react'
import './Searchres.css'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function SearchRes({buses}) {

  const navigate = useNavigate();

  function handleBooking(bus)
  {
    console.log("Sending bus:", bus);
    navigate("/booking",{
      state:{
        bus:bus
      }
    })
  }
  

  return (
    <div className='container'>
        {
          buses.length===0?(
          <h3>No Buses Available</h3>):
          buses.map((e)=>{
            return(
            <div className='buscard' key={e.busId}>
              <h2>{e.busNumber}</h2>

            <div className="route">
              <span>{e.source}</span>
              ➡️
              <span>{e.destination}</span>
            </div>

            <p>
              Departure:
              <b>{e.departureTime}</b>
            </p>

            <p>
              Arrival:
              <b>{e.arrivalTime}</b>
            </p>

            <p>
              Available Seats:
              <b>{e.totalSeats}</b>
            </p>

            <button onClick={()=>handleBooking(e)}>
              Book Now
            </button>
            </div>)
          })

        }
    </div>
  )
}

export default SearchRes