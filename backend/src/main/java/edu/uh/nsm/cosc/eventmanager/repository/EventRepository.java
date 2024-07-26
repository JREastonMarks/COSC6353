package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uh.nsm.cosc.eventmanager.model.Event;

public interface EventRepository extends JpaRepository<Event, Long>{

    List<Event> findByName(String name);
    List<Event> findById(long Id);
}