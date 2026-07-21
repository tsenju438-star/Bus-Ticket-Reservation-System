package com.Bus.TicketReservation.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequestFormDTO
{
    private Long busId;

    private String passengerName;
    private int age;
    private String gender;
    private String mobile;
    private String email;

    private int seatsBooked;
    private LocalDate dateOfTravel;
}
