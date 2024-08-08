package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.History;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.service.HistoryService;
import edu.uh.nsm.cosc.eventmanager.service.UserService;


@RestController
@RequestMapping("/api")
public class HistoryController {
    private HistoryService historyService;
    private UserService userService;

    public HistoryController(HistoryService historyService, UserService userService) {
        this.historyService = historyService;
        this.userService = userService;
    }

    @GetMapping(path="/histories")
    List<History> messages(@AuthenticationPrincipal UserDetails userDetails) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		return historyService.getHistories(user);
    }
    
    @GetMapping(path="/history/{historyId}")
    History viewHistory(@PathVariable (required=true) long historyId) {
        return historyService.getHistory(historyId);
    }
}
