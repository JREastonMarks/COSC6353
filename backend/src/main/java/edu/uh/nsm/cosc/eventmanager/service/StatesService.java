package edu.uh.nsm.cosc.eventmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.States;
import edu.uh.nsm.cosc.eventmanager.repository.StatesRepository;

@Service
public class StatesService {
	private StatesRepository statesRepository;
	
	public StatesService(StatesRepository statesRepository) {
		this.statesRepository = statesRepository;
	}
	

	public List<States> getStates() {
		return statesRepository.findAll();
	}

	public States getState(String stateCode) {
		return statesRepository.getReferenceById(stateCode);
	}

}
