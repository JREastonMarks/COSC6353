package edu.uh.nsm.cosc.eventmanager.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import edu.uh.nsm.cosc.eventmanager.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.web.DefaultRedirectStrategy;
import  org.springframework.security.web.RedirectStrategy;

public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	
	 private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		User user = ((UserPrincipal) authentication.getPrincipal()).getUser();
		
		// If the user has not registered yet then send them to their registration page
		if(!user.isRegistered() && user.getRole().equals("volunteer")) {
			redirectStrategy.sendRedirect(request, response, "/volunteer");
		} else if(!user.isRegistered() && !user.getRole().equals("admin")) {
			redirectStrategy.sendRedirect(request, response, "/administrator");
		} else {
			redirectStrategy.sendRedirect(request, response, "/notifiations");
		}
	}
	

}
