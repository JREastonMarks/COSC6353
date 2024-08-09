package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
    
    @GetMapping(path="/match/{matchId}")
    Match match(@PathVariable(required=true) long matchId){
        return matchService.getMatch(matchId);
    }
    
    @PostMapping(path="/match")
    String createMatches(@RequestBody Match[] matches) {
    	for (Match match : matches) {
    		this.matchService.createMatch(match);
    	}
    	return "success";
    }
    
    @GetMapping(path="/match/findUserMatches/{eventId}")
    List<User> findUserMatches(@PathVariable(required=true) long eventId) {
    	return matchService.findUserMatches(eventId);
    }
    
    @GetMapping(path="/match/findEventMatches/{eventId}")
    List<Match> findEventMatches(@PathVariable(required=true) long eventId) {
    	return matchService.findEventMatches(eventId);
    }
}
