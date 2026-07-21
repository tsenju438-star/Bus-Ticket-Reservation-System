import React from 'react';
import axios from "axios";
import './Mybooking.css';

const Mybooking = () => {

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const cancelBooking = async (bookingId) => {

    try {

      const response = await axios.delete(
        `http://localhost:8080/api/bookings/${bookingId}`
      );

      alert(response.data);

      // Remove cancelled booking from localStorage
      const updatedBookings = bookings.filter(
        (booking) => booking.bookingId !== bookingId
      );

      localStorage.setItem(
        "bookings",
        JSON.stringify(updatedBookings)
      );

      window.location.reload();

    } catch (error) {
      console.log(error);
      alert("Cancellation failed");
    }
  };


  return (
    <div className="mybook">

      {bookings.length > 0 ? (

        bookings.map((booking) => (

          <div 
            className='mybookings' 
            key={booking.bookingId}
          >

            <ul>

              <div>
                <li>Booking Id</li>
                <li>{booking.bookingId}</li>
              </div>

              <div>
                <li>Booking Name</li>
                <li>{booking.passengerName}</li>
              </div>

              <div>
                <li>Source</li>
                <li>{booking.source}</li>
              </div>

              <div>
                <li>Destination</li>
                <li>{booking.destination}</li>
              </div>

              <div>
                <li>Booking Date</li>
                <li>{booking.bookingDate}</li>
              </div>

              <div>
                <li>Seats Booked</li>
                <li>{booking.seatsBooked}</li>
              </div>

              <div>
                <li>Status</li>
                <li>{booking.status}</li>
              </div>

              <div>
                <li>Bus No</li>
                <li>{booking.busNo}</li>
              </div>


              <button 
                onClick={() => cancelBooking(booking.bookingId)}
              >
                Cancel
              </button>

            </ul>

          </div>

        ))

      ) : (

        <div>No booking available</div>

      )}

    </div>
  );
};

export default Mybooking;