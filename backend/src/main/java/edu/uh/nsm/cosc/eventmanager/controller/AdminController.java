package edu.uh.nsm.cosc.eventmanager.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.service.UserService;

@RestController
@RequestMapping("/api")
public class AdminController {
	private UserService userService;
	
	public AdminController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping(path="/userInfo")
	public User userInfo(@AuthenticationPrincipal UserDetails userDetails) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		user.setPassword(null);
		return user;
	}
}
