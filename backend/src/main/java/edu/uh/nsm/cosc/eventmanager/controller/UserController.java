package edu.uh.nsm.cosc.eventmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.service.UserService;


@RestController
public class UserController {
    private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}

    @GetMapping(path="/user/{userId}")
    User information(@PathVariable(required=true) long userId) {
        return userService.getUser(userId);
    }
    
}
