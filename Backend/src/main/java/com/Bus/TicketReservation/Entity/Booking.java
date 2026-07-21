package com.Bus.TicketReservation.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    private LocalDate dateOfTravel;
    private LocalDate bookingDate;
    private int seatsBooked;
    private String status;

    @ManyToOne
    private Bus bus;

    @ManyToOne
    private Passenger passenger;

}
