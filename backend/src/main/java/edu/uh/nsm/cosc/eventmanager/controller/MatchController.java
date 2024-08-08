package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.service.MatchService;
import edu.uh.nsm.cosc.eventmanager.service.UserService;

@RestController
@RequestMapping("/api")
public class MatchController {
    private MatchService matchService;
    private UserService userService;
    
    public MatchController(MatchService matchService,UserService userService){
        this.matchService = matchService;
        this.userService = userService;
    }
    
    @GetMapping(path="/matches")
    List<Match> matchByUser(@AuthenticationPrincipal UserDetails userDetails) {
    	User user = userService.findUserByUsername(userDetails.getUsername());
    	return matchService.getMatches(user);
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
