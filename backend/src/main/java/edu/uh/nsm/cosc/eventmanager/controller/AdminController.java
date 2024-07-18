package edu.uh.nsm.cosc.eventmanager.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdminController {
	
	@GetMapping(path="/userInfo")
	public UserDetails userInfo(@AuthenticationPrincipal UserDetails user) {
		return user;
	}
}
