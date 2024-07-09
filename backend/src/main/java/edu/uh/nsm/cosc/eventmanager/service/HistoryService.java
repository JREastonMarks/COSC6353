package edu.uh.nsm.cosc.eventmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.History;
import edu.uh.nsm.cosc.eventmanager.repository.HistoryRepository;

@Service
public class HistoryService {
    private HistoryRepository historyRepository;

    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public List<History> getHistories() {
        return historyRepository.findAll();
    }
    
    public History getHistory(long historyId) {
        return historyRepository.findHistoryById(historyId);
    }
}
