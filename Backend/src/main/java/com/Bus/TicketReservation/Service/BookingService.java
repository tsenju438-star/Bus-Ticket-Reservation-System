package com.Bus.TicketReservation.Service;

import com.Bus.TicketReservation.DTO.BookingRequestFormDTO;
import com.Bus.TicketReservation.DTO.BookingResponseDTO;
import com.Bus.TicketReservation.Entity.Booking;
import com.Bus.TicketReservation.Entity.Bus;
import com.Bus.TicketReservation.Entity.Passenger;
import com.Bus.TicketReservation.Exception.ResourceNotFoundException;
import com.Bus.TicketReservation.Repository.BookingRepository;
import com.Bus.TicketReservation.Repository.BusRepository;
import com.Bus.TicketReservation.Repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService
{
    @Autowired
    private BookingRepository repo;

    @Autowired
    private PassengerRepository passrepo;

    @Autowired
    private BusRepository busrepo;

    public List<BookingResponseDTO> getBookings() {
        List<BookingResponseDTO> list = new ArrayList<>();

        for (Booking booking : repo.findAll()) {
            list.add(new BookingResponseDTO(booking));
        }

        return list;
    }

    public BookingResponseDTO getBooking(long id)
    {
        Booking b=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Resource Not found for id "+id));
            BookingResponseDTO bookingres=new BookingResponseDTO(b);
            return bookingres;
    }

    public String cancel(long id) {
        Booking b = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
            if(b.getStatus().equals("Cancelled"))
                return "Seat already cancelled";
            else {
                b.setStatus("Cancelled");

                Bus bus = b.getBus();
                bus.setSeatsAvailable(bus.getSeatsAvailable() + b.getSeatsBooked());

                busrepo.save(bus);
                repo.save(b);
                return "Seat cancelled successfully";
            }
        }

    public BookingResponseDTO book(BookingRequestFormDTO b) {

        Booking book = new Booking();

        Bus bus = busrepo.findById(b.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found for id " + b.getBusId()));

        if (bus.getSeatsAvailable() < b.getSeatsBooked()) {
            throw new ResourceNotFoundException("The requested number of seats is not available");
        }

        Passenger passenger = new Passenger(
                b.getPassengerName(),
                b.getGender(),
                b.getMobile(),
                b.getAge(),
                b.getEmail()
        );

        Passenger savedPassenger = passrepo.save(passenger);

        book.setBus(bus);
        book.setPassenger(savedPassenger);
        book.setDateOfTravel(b.getDateOfTravel());
        book.setBookingDate(LocalDate.now());
        book.setSeatsBooked(b.getSeatsBooked());
        book.setStatus("Booked");

        bus.setSeatsAvailable(bus.getSeatsAvailable() - b.getSeatsBooked());
        busrepo.save(bus);

        Booking savedBooking = repo.save(book);

        return new BookingResponseDTO(savedBooking);
    }
}

