package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.service.MatchService;

@RestController
@RequestMapping("/api")
public class MatchController {
    private MatchService matchService;
    
    public MatchController(MatchService matchService){
        this.matchService = matchService;
    }

    @GetMapping(path="/matches")
    List<Match> matches(@PathVariable(required=true) Event event){
        return matchService.getMatches();
    }
    
    @GetMapping(path="/match/{matchId}")
    Match match(@PathVariable(required=true) long matchId){
        return matchService.getMatch(matchId);
    }

    @PostMapping(path="/match")
    void createMatch(Match match){
        matchService.createMatch(match);
    }
}
