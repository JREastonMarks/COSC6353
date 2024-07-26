package edu.uh.nsm.cosc.eventmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;


public interface MatchRepository extends JpaRepository<Match, Long>{

    List<Match> findByEvent(Event event);
    List<Match> findBySkill(String skill);
}