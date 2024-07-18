package edu.uh.nsm.cosc.eventmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.repository.MatchRepository;

@Service
public class MatchService {
    private MatchRepository matchRepository;
    
    public MatchService(MatchRepository matchRepository){
        this.matchRepository = matchRepository;
    }

    public List<Match> getMatchByEvent(Event event){
        return matchRepository.findAllByEvent(event);
    }

    public Match getMatch(String skill){
        return matchRepository.matchBySkill(skill);
    }
}
