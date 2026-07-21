package com.Bus.TicketReservation.Service;

import com.Bus.TicketReservation.DTO.SearchBusDTO;
import com.Bus.TicketReservation.Entity.Bus;
import com.Bus.TicketReservation.Exception.ResourceNotFoundException;
import com.Bus.TicketReservation.Repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusService
{
    @Autowired
    private BusRepository repo;
    public  Bus addBus(Bus b)
    {
        return repo.save(b);
    }

    public List<Bus> addBusList(List<Bus> b)
    {
        return repo.saveAll(b);
    }

    public Bus getById(long id)
    {
        Bus b=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("no data found on the given id"));
        return b;
    }

    public List<Bus> getAll()
    {
        return repo.findAll();
    }

    public Bus update(Bus b)
    {
        return repo.save(b);
    }

    public String delete(long id)
    {
        Optional<Bus> b=repo.findById(id);
        if(b.isPresent())
        {
            repo.deleteById(id);
            return "data deleted successfully";
        }
        else
        {
            throw new ResourceNotFoundException("data not found for id");
        }
    }

    public List<Bus> search(String source,String destination,int seats)
    {
        return repo.findAvailableBuses(source, destination,seats);
    }

}
