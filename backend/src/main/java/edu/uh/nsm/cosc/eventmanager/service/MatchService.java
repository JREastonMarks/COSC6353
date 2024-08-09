package edu.uh.nsm.cosc.eventmanager.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.Event;
import edu.uh.nsm.cosc.eventmanager.model.Match;
import edu.uh.nsm.cosc.eventmanager.model.Notification;
import edu.uh.nsm.cosc.eventmanager.model.Skill;
import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.EventRepository;
import edu.uh.nsm.cosc.eventmanager.repository.MatchRepository;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;

@Service
public class MatchService {
    private MatchRepository matchRepository;
    private EventRepository eventRepository;
    private UserRepository userRepository;
    private NotificationService notificationService;
    
    public MatchService(MatchRepository matchRepository, EventRepository eventRepository, UserRepository userRepository, NotificationService notificationService){
        this.matchRepository = matchRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public List<Match> getMatches(){
        return matchRepository.findAll();
    }

    public Match getMatch(long matchId){
        return matchRepository.getReferenceById(matchId);
    }

    public void createMatch(Match match){
        matchRepository.save(match);
        Event event = match.getEvent();
        Notification notification = new Notification();
        notification.setSender(event.getAdministrator());
        notification.setReceiver(match.getVolunteer());
        notification.setTitle("New Volunteer Shift - " + event.getName());
        notification.setMessage(String.format("You have been scheduled to work on %s at %s.", event.getEventdate(), event.getAddress()));
        notificationService.createNotification(notification);
    }

	public List<Match> getMatches(User user) {
		return matchRepository.findByVolunteer(user);
	}

	public List<User> findUserMatches(long eventId) {
		Event event = eventRepository.findById(eventId);
		Date eventDate = event.getEventdate();
		List<Skill> skillsNeeded = event.getSkills();
		
		List<User> users = userRepository.findBySelectedDatesAndSkillsIn(eventDate, skillsNeeded);
		
		
		users.stream().filter(user -> {
			List<Match> userMatches = matchRepository.findByVolunteer(user);
			
			for (Match userMatch : userMatches) {
				if(userMatch.getEvent().getEventdate() == eventDate) {
					return false;
				}
			}
			
			return true;
		}).collect(Collectors.toList());
		
		
		return users;
		
	}

	public List<Match> findEventMatches(long eventId) {
		Event event = eventRepository.findById(eventId);
		
		return matchRepository.findByEvent(event);
	}
}
