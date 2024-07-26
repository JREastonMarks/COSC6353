package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.History;
import edu.uh.nsm.cosc.eventmanager.model.User;

public interface HistoryRepository extends JpaRepository<History, Long>{
    
    List<History> findByVolunteer(User volunteer);
    List<History> findByEvent(Event event);
}
