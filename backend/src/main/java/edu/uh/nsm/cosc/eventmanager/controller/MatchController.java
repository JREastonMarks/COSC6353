package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.service.MatchService;

@RestController
public class MatchController {
    private MatchService matchService;
    
    public MatchController(MatchService matchService){
        this.matchService = matchService;
    }

    @GetMapping(path="/match")
    List<Match> matches(@PathVariable(required=true) Event event){
        return matchService.getMatchByEvent(event);
    }
    
    @GetMapping(path="/match/{skill}")
    Match match(@PathVariable(required=true) String skill){
        return matchService.getMatch(skill);
    }
}
