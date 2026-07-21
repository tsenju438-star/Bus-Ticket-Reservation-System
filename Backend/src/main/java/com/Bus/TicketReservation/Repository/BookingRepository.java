package com.Bus.TicketReservation.Repository;

import com.Bus.TicketReservation.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking,Long> {
}
