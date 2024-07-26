package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.History;
import edu.uh.nsm.cosc.eventmanager.service.HistoryService;

@RestController
@RequestMapping("/api")
public class HistoryController {
    private HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping(path="/histories")
    List<History> viewHistories() {
        return historyService.getHistories();
    }
    
    @GetMapping(path="/history/{historyId}")
    History viewHistory(@PathVariable (required=true) long historyId) {
        return historyService.getHistory(historyId);
    }
    
    @PostMapping
    void createHistory(History history){
        historyService.createHistory(history);
    }
}
