package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.User;

public interface EventRepository extends JpaRepository<Event, Long>{

    List<Event> findByName(String name);
    Event findById(long Id);
    List<Event> findByAdministrator(User user);
}