package edu.uh.nsm.cosc.eventmanager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.States;
import edu.uh.nsm.cosc.eventmanager.service.StatesService;

@RestController
@RequestMapping("/api")
public class StatesController {
private StatesService statesService;
	
	public StatesController(StatesService statesService) {
		this.statesService = statesService;
	}
	
	@GetMapping(path="/states")
	List<States> states() {
		return statesService.getStates();
	}
	
	@GetMapping(path="/state/{stateCode}")
	States state(@PathVariable(required=true) String stateCode) {
		return statesService.getState(stateCode);
	}
}