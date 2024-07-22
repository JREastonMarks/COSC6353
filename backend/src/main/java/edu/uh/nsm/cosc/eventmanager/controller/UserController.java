package edu.uh.nsm.cosc.eventmanager.controller;

import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uh.nsm.cosc.eventmanager.model.User;
import edu.uh.nsm.cosc.eventmanager.service.UserService;


@RestController
@RequestMapping("/api/user")
public class UserController {
    private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}

    @GetMapping(path="/{userId}")
    User information(@PathVariable(required=true) long userId) {
        return userService.getUser(userId);
    }
    
    @PostMapping(path="/register")
    String register(@ModelAttribute("user")User user, BindingResult result,  ModelMap model) { 
    	if (result.hasErrors()) {
            return "error";
        }
    	
    	userService.registerUser(user);
		return "";
    }
    
}
