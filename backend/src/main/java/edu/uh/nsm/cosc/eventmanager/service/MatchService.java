package edu.uh.nsm.cosc.eventmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.repository.MatchRepository;

@Service
public class MatchService {
    private MatchRepository matchRepository;
    
    public MatchService(MatchRepository matchRepository){
        this.matchRepository = matchRepository;
    }

    public List<Match> getMatches(){
        return matchRepository.findAll();
    }

    public Match getMatch(long matchId){
        return matchRepository.getReferenceById(matchId);
    }

    public void createMatch(Match match){
        matchRepository.save(match);
    }
}
