package edu.uh.nsm.cosc.eventmanager.service;

import org.springframework.stereotype.Service;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.repository.UserRepository;


@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getUser(long userId) {
        return userRepository.userInformationById(userId);
    }
}
